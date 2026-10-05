import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useFormContext } from "react-hook-form";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import RHFForm from "@/components/form/rhf.form";
import { Controller } from "react-hook-form";
import { useFieldError } from "@/components/form/useFieldError";
import { TextAreaField } from "@/components/form/field";
import { Skeleton } from "@/components/ui/skeleton";
import Pagination from "@/components/pagination.components";
import { reviewSchema } from "@/utils/schemas";
import { useAuth } from "@/hooks/auth/useAuth.hooks";
import {
  useReviewsByRecipe,
  useReviewSummary,
  useCreateReview,
  useUpdateReview,
  useDeleteReview,
} from "@/hooks/reviews/useReviews.hooks";

/** Bintang read-only (dukung pecahan .5 via fill). */
export const RatingDisplay = ({ value = 0, className }) => (
  <div className={cn("flex items-center gap-0.5", className)} aria-label={`Rating ${value} dari 5`}>
    {[1, 2, 3, 4, 5].map((i) => (
      <Star
        key={i}
        className={cn(
          "h-4 w-4",
          i <= Math.round(Number(value) || 0)
            ? "fill-amber-400 text-amber-400"
            : "text-neutral-300 dark:text-neutral-600",
        )}
      />
    ))}
  </div>
);

/** Input bintang 1-5 yang bisa diklik, terhubung ke react-hook-form. */
const RatingInput = ({ name = "rating" }) => {
  const { control } = useFormContext();
  const error = useFieldError(name);
  const { t } = useTranslation();

  return (
    <div>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <div className="flex items-center gap-1" role="radiogroup" aria-label={t("detail.review.rating_label")}>
            {[1, 2, 3, 4, 5].map((i) => (
              <button
                key={i}
                type="button"
                onClick={() => field.onChange(i)}
                className="p-1 transition hover:scale-110"
                aria-label={`${i} bintang`}
              >
                <Star
                  className={cn(
                    "h-7 w-7",
                    i <= Number(field.value || 0)
                      ? "fill-amber-400 text-amber-400"
                      : "text-neutral-300 dark:text-neutral-600",
                  )}
                />
              </button>
            ))}
          </div>
        )}
      />
      {error && (
        <p role="alert" className="mt-1 text-xs text-red-500">
          {error}
        </p>
      )}
    </div>
  );
};

const ReviewFormFields = () => {
  const { t } = useTranslation();
  const { register } = useFormContext();
  const commentError = useFieldError("comment");

  return (
    <div className="space-y-4">
      <div>
        <p className="mb-2 block text-sm font-medium text-gray-700 dark:text-neutral-400">
          {t("detail.review.rating_label")}
        </p>
        <RatingInput />
      </div>
      <TextAreaField
        label={t("detail.review.comment_label")}
        placeholder={t("detail.review.comment_placeholder")}
        error={commentError}
        {...register("comment")}
      />
    </div>
  );
};

export default function ReviewSection({ recipeId }) {
  const { t } = useTranslation();
  const { me } = useAuth();
  const [page, setPage] = useState(1);
  const [editingId, setEditingId] = useState(null);

  const { reviews, totalPage, currentPage, loadingReviews } =
    useReviewsByRecipe(recipeId, { page, limit: 10 });
  const { summary, loadingSummary } = useReviewSummary(recipeId);
  const { createReview, loadingCreateReview } = useCreateReview(recipeId);
  const { updateReview, loadingUpdateReview } = useUpdateReview();
  const { deleteReview, loadingDeleteId } = useDeleteReview();

  const handleSubmit = async (values, { reset }) => {
    if (editingId) {
      await updateReview({ id: editingId, payload: values });
      setEditingId(null);
    } else {
      await createReview(values);
    }
    reset({ rating: 0, comment: "" });
    return true;
  };

  const startEdit = (review) => {
    setEditingId(review.id);
    window.document
      .getElementById("review-form-title")
      ?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <section className="mt-6 rounded-2xl bg-white p-6 dark:bg-neutral-900">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-lg font-bold">{t("detail.review.title")}</h2>
        {loadingSummary ? (
          <Skeleton className="h-5 w-32 rounded-lg" />
        ) : (
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-neutral-400">
            <RatingDisplay value={summary.averageRating} />
            <span>
              {summary.averageRating} / 5 ({summary.totalReviews} {t("detail.review.count_suffix")})
            </span>
          </div>
        )}
      </div>

      {/* Form (hanya user login) */}
      {me ? (
        <div className="mt-5 rounded-xl border border-neutral-200 p-4 dark:border-neutral-800">
          <h3 id="review-form-title" className="mb-3 text-sm font-semibold">
            {editingId ? t("detail.review.edit_title") : t("detail.review.form_title")}
          </h3>
          <RHFForm
            key={editingId ?? "new"}
            schema={reviewSchema}
            defaultValues={{ rating: 0, comment: "" }}
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            {(isSubmitting) => (
              <>
                <ReviewFormFields />
                <div className="flex gap-2">
                  <button
                    type="submit"
                    disabled={isSubmitting || loadingCreateReview || loadingUpdateReview}
                    className="h-11 rounded-lg bg-orange-500 px-5 font-medium text-white transition hover:bg-orange-600 disabled:opacity-60"
                  >
                    {editingId
                      ? t("detail.review.button_update")
                      : t("detail.review.button_submit")}
                  </button>
                  {editingId && (
                    <button
                      type="button"
                      onClick={() => setEditingId(null)}
                      className="h-11 rounded-lg px-5 font-medium text-gray-500 ring-1 ring-neutral-300 transition hover:bg-neutral-100 dark:text-neutral-300 dark:ring-neutral-700 dark:hover:bg-neutral-800"
                    >
                      {t("common.cancel")}
                    </button>
                  )}
                </div>
              </>
            )}
          </RHFForm>
        </div>
      ) : (
        <p className="mt-5 rounded-xl bg-neutral-100 p-4 text-sm text-gray-500 dark:bg-neutral-800 dark:text-neutral-400">
          {t("detail.review.login_hint")}
        </p>
      )}

      {/* Daftar */}
      <div className="mt-5 space-y-4">
        {loadingReviews ? (
          <>
            <Skeleton className="h-20 w-full rounded-xl" />
            <Skeleton className="h-20 w-full rounded-xl" />
          </>
        ) : reviews.length === 0 ? (
          <p className="text-sm text-gray-500 dark:text-neutral-400">
            {t("detail.review.empty")}
          </p>
        ) : (
          reviews.map((review) => {
            const isOwner = me && review.userId === me.id;
            return (
              <article
                key={review.id}
                className="rounded-xl border border-neutral-200 p-4 dark:border-neutral-800"
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-500/10 font-bold text-orange-500">
                      {(review.reviewer?.username || "?").charAt(0).toUpperCase()}
                    </span>
                    <div>
                      <p className="text-sm font-semibold">{review.reviewer?.username}</p>
                      <RatingDisplay value={review.rating} />
                    </div>
                  </div>
                  {isOwner && (
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => startEdit(review)}
                        className="text-xs font-medium text-orange-500 hover:underline"
                      >
                        {t("common.edit")}
                      </button>
                      <button
                        type="button"
                        disabled={loadingDeleteId === review.id}
                        onClick={() => deleteReview(review.id)}
                        className="text-xs font-medium text-red-500 hover:underline disabled:opacity-60"
                      >
                        {t("common.delete")}
                      </button>
                    </div>
                  )}
                </div>
                {review.comment && (
                  <p className="mt-2 text-sm text-gray-700 dark:text-neutral-300">
                    {review.comment}
                  </p>
                )}
              </article>
            );
          })
        )}
      </div>

      {/* Pagination */}
      {totalPage > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPage={totalPage}
          onPageChange={setPage}
        />
      )}
    </section>
  );
}
