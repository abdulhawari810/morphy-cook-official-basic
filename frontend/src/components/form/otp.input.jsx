import { forwardRef, useImperativeHandle, useRef } from "react";
import { cn } from "@/lib/utils";
import { ERROR_TEXT } from "@/components/form/field";

const OTP_LENGTH = 6;

/**
 * Input OTP 6 digit.
 *
 * Multi-box ini bukan 6 input terpisah: secara semantik tetap
 * satu field bernama `name`, jadi zod cukup memvalidasi satu string
 * `^\d{6}$` (lihat `otpSchema`).
 *
 * Imperative handle supaya form bisa:
 * - `focus()` saat modal dibuka
 * - `clear()` saat user menekan tombol cancel
 */
const OtpInput = forwardRef(
  ({ name, value = "", onChange, onComplete, error, disabled }, ref) => {
    const inputsRef = useRef([]);

    const digits = value.padEnd(OTP_LENGTH, " ").slice(0, OTP_LENGTH).split("");

    useImperativeHandle(ref, () => ({
      focus: () => inputsRef.current[0]?.focus(),
      clear: () => onChange?.(""),
    }));

    const setDigit = (index, digit) => {
      const next = digits.map((d, i) => (i === index ? digit : d === " " ? "" : d));

      const joined = next.join("").replace(/\s/g, "");
      onChange?.(joined);

      if (digit && index < OTP_LENGTH - 1) {
        inputsRef.current[index + 1]?.focus();
      }

      if (joined.length === OTP_LENGTH) {
        onComplete?.(joined);
      }
    };

    const handleChange = (index) => (e) => {
      //_ input `type="text"` dengan inputMode numeric, filter manual
      const raw = e.target.value.replace(/\D/g, "");

      if (!raw) {
        setDigit(index, "");
        return;
      }

      //_ paste beberapa digit sekaligus
      if (raw.length > 1) {
        raw
          .slice(0, OTP_LENGTH - index)
          .split("")
          .forEach((digit, offset) => {
            setDigit(index + offset, digit);
          });

        return;
      }

      setDigit(index, raw);
    };

    const handleKeyDown = (index) => (e) => {
      if (e.key === "Backspace") {
        e.preventDefault();

        if (digits[index]) {
          setDigit(index, "");
          return;
        }

        if (index > 0) {
          setDigit(index - 1, "");
          inputsRef.current[index - 1]?.focus();
        }

        return;
      }

      if (e.key === "ArrowLeft" && index > 0) {
        inputsRef.current[index - 1]?.focus();
      }

      if (e.key === "ArrowRight" && index < OTP_LENGTH - 1) {
        inputsRef.current[index + 1]?.focus();
      }
    };

    const handlePaste = (e) => {
      e.preventDefault();

      const pasted = e.clipboardData
        .getData("text")
        .replace(/\D/g, "")
        .slice(0, OTP_LENGTH - 0);

      if (!pasted) return;

      pasted.split("").forEach((digit, index) => setDigit(index, digit));

      inputsRef.current[Math.min(pasted.length, OTP_LENGTH - 1)]?.focus();
    };

    return (
      <div className="w-full">
        {/* satu input yang sebenarnya di-submit, box-nya cuma visual */}
        <input type="hidden" name={name} value={value} readOnly />

        <div
          className="flex items-center justify-center gap-2 sm:gap-3"
          onPaste={handlePaste}
        >
          {digits.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputsRef.current[index] = el)}
              type="text"
              inputMode="numeric"
              autoComplete={index === 0 ? "one-time-code" : "off"}
              maxLength={OTP_LENGTH}
              disabled={disabled}
              value={digit === " " ? "" : digit}
              onChange={handleChange(index)}
              onKeyDown={handleKeyDown(index)}
              onFocus={(e) => e.target.select()}
              aria-label={`Digit ${index + 1}`}
              aria-invalid={error ? "true" : undefined}
              className={cn(
                "w-11 h-14 sm:w-12 sm:h-12 text-center text-xl font-bold rounded-md",
                "bg-slate-50 dark:bg-neutral-800 text-black dark:text-orange-500",
                "border outline-none transition",
                error
                  ? "border-red-500"
                  : "border-slate-600 focus:border-orange-500",
              )}
            />
          ))}
        </div>

        {error && (
          <p role="alert" className={cn(ERROR_TEXT, "text-center")}>
            {error}
          </p>
        )}
      </div>
    );
  },
);

OtpInput.displayName = "OtpInput";

export default OtpInput;