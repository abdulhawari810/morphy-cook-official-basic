import React, { useEffect } from "react";
import { createPortal } from "react-dom";

const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  containerClass,
  bodyClass,
  titleClass,
  customClass,
  btnConfirm,
  btnCancel,
  btnTitleConfirm,
  btnTitleCancel,
  bodyButtonClass,
  btnConfirmClass,
  btnCancelClass,
  custom = false,
}) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.body.style.overflow = isOpen ? "hidden" : "auto";
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose, isOpen]);

  return createPortal(
    <>
      {isOpen && (
        <>
          {custom ? (
            <div className="fixed top-0 w-full h-full  inset-0 left-0 z-999999">
              {children}
            </div>
          ) : (
            <div
              className={
                containerClass ||
                "fixed left-0 top-0 z-9999 bg-red-500 w-full h-full flex items-center justify-center pointer-events-none"
              }
            >
              <div
                className={
                  bodyClass ||
                  "bg-white rounded-xl shadow-lg w-full max-w-md pointer-events-auto"
                }
              >
                <div
                  className={
                    titleClass ||
                    "flex items-center justify-between p-6 border-b"
                  }
                >
                  <h2 className="text-xl font-semibold">{title}</h2>
                </div>
                <div className={customClass || "p-6"}>{children}</div>
                <div
                  className={
                    bodyButtonClass ||
                    "flex items-center justify-end p-6 border-t gap-4"
                  }
                >
                  <button
                    type="button"
                    className={
                      btnCancelClass ||
                      "p-2.5 font-medium outline outline-slate-400 text-gray-900 rounded-lg"
                    }
                    onClick={btnCancel}
                  >
                    {btnTitleCancel}
                  </button>
                  <button
                    type="button"
                    onClick={btnConfirm}
                    className={
                      btnConfirmClass ||
                      "p-2.5 bg-red-600 font-medium text-white rounded-lg"
                    }
                  >
                    {btnTitleConfirm}
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </>,
    document.body,
  );
};

export default Modal;
