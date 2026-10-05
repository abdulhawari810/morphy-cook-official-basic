// Error messages for mockup - supports i18n
// This file contains all error messages used in mockup.js

const errorMessages = {
  en: {
    // Auth errors
    auth_not_login: "You are not logged in",
    auth_user_not_found: "User not found!",
    auth_invalid_credentials: "Invalid demo account!",
    auth_password_wrong: "Wrong password!",
    auth_banned: "Your account is banned",
    auth_deleted: "Your account is deleted",
    auth_email_exists: "Email address already in use!",
    auth_username_exists: "Username already in use!",
    auth_password_mismatch: "Passwords do not match!",
    auth_old_password_wrong: "Old password is incorrect",
    auth_2fa_secret_not_found: "2FA secret not found!",
    auth_2fa_code_wrong: "Verification code is incorrect!",

    // User errors
    user_not_found: "User not found!",
    user_admin_cannot_update: "Admin user cannot be updated!",
    user_admin_cannot_change_status: "Admin user status cannot be changed!",
    user_admin_cannot_delete_ban: "Admin user cannot be deleted or banned!",
    user_status_updated: "User status updated successfully",
    user_deleted: "User deleted successfully",

    // Recipe errors
    recipe_not_found: "Recipe not found!",
    recipe_exists: "Recipe already added!",
    recipe_add_success: "Recipe added successfully.",
    recipe_update_success: "Recipe updated successfully.",
    recipe_delete_success: "Recipe deleted successfully!",
    recipe_approved: "Recipe approved",
    recipe_rejected: "Recipe rejected",
    recipe_drafted: "Recipe drafted",
    recipe_not_chef: "You cannot add recipes",
    recipe_not_chef_update: "You are not authorized to update this recipe.",
    recipe_not_chef_delete: "You cannot delete this recipe!",

    // Category errors
    category_empty: "Category is empty",
    category_not_found: "Category not found!",
    category_deleted: "Category deleted successfully",

    // Favourite errors
    favourite_not_login: "You are not logged in!",
    favourite_exists: "Recipe already added!",
    favourite_add_success: "Recipe added successfully",
    favourite_not_found: "Favourite recipe not found!",
    favourite_delete_success: "Favourite recipe deleted successfully",

    // Review errors
    review_not_login: "You are not logged in!",
    review_not_found: "Review not found!",
    review_recipe_not_found: "Recipe not found!",
    review_exists: "You have already reviewed this recipe!",
    review_invalid_rating: "Rating must be an integer between 1 and 5!",
    review_comment_too_long: "Comment must be at most 1000 characters!",
    review_no_fields: "No fields to update!",
    review_forbidden: "You are not allowed to delete this review!",
    review_add_success: "Review created successfully!",
    review_update_success: "Review updated successfully!",
    review_delete_success: "Review deleted successfully!",

    // Profile errors
    profile_not_login: "You are not logged in!",
    profile_exists: "Profile already exists!",
    profile_not_found: "Profile not found!",

    // Upload errors
    upload_not_login: "You are not logged in!",
    upload_success: "Avatar uploaded successfully",

    // 2FA errors
    two_fa_secret_not_found: "Secret not found!",
    two_fa_code_wrong: "Verification code is incorrect!",
    two_fa_enabled: "2FA activated successfully",
    two_fa_disabled: "2FA deactivated successfully",

    // Validation errors
    validation_empty: "{field} cannot be empty!",
    validation_current_password_empty: "Current password cannot be empty!",
    validation_new_password_empty: "New password cannot be empty!",
    validation_confirm_password_empty: "Confirm Password cannot be empty!",
    validation_password_mismatch: "New Password and Confirm Password do not match!",

    // Profile form errors
    profile_date_required: "Date of birth is required!",
  },
  id: {
    // Auth errors
    auth_not_login: "Anda belum login",
    auth_user_not_found: "User tidak ditemukan!",
    auth_invalid_credentials: "Akun demo salah!",
    auth_password_wrong: "Password Salah!",
    auth_banned: "Akun anda dibanned",
    auth_deleted: "Akun anda dihapus",
    auth_email_exists: "Alamat Email sudah digunakan!",
    auth_username_exists: "Username sudah digunakan!",
    auth_password_mismatch: "Kata sandi dan Konfirmasi kata sandi tidak sama!",
    auth_old_password_wrong: "Password lama salah",
    auth_2fa_secret_not_found: "Secret 2FA tidak ditemukan!",
    auth_2fa_code_wrong: "Kode verifikasi salah!",

    // User errors
    user_not_found: "User tidak ditemukan!",
    user_admin_cannot_update: "User admin tidak dapat diubah!",
    user_admin_cannot_change_status: "Status user admin tidak dapat diubah!",
    user_admin_cannot_delete_ban: "User admin tidak dapat dihapus atau dibanned!",
    user_status_updated: "Status user berhasil diupdated",
    user_deleted: "User berhasil dihapus",

    // Recipe errors
    recipe_not_found: "Resep tidak ditemukan!",
    recipe_exists: "Resep ini sudah ditambahkan!",
    recipe_add_success: "Resep berhasil ditambahkan.",
    recipe_update_success: "Resep berhasil diubah!",
    recipe_delete_success: "Resep berhasil dihapus!",
    recipe_approved: "Resep berhasil disetujui",
    recipe_rejected: "Resep berhasil ditolak",
    recipe_drafted: "Resep berhasil didraft",
    recipe_not_chef: "Anda tidak bisa menambah resep",
    recipe_not_chef_update: "Anda tidak berhak untuk mengupdate resep ini.",
    recipe_not_chef_delete: "Anda tidak bisa menghapus resep ini!",

    // Category errors
    category_empty: "Category masih kosong",
    category_not_found: "Category tidak ditemukan!",
    category_deleted: "Category berhasil dihapus",

    // Favourite errors
    favourite_not_login: "Kamu belum login!",
    favourite_exists: "Resep ini sudah ditambahkan!",
    favourite_add_success: "Resep berhasil ditambahkan",
    favourite_not_found: "Favourite Resep tidak ditemukan!",
    favourite_delete_success: "Favourite Resep berhasil dihapus",

    // Review errors
    review_not_login: "Kamu belum login!",
    review_not_found: "Review tidak ditemukan!",
    review_recipe_not_found: "Resep tidak ditemukan!",
    review_exists: "Kamu sudah memberi ulasan untuk resep ini!",
    review_invalid_rating: "Rating harus angka 1 sampai 5!",
    review_comment_too_long: "Komentar maksimal 1000 karakter!",
    review_no_fields: "Tidak ada field yang diupdate!",
    review_forbidden: "Kamu tidak boleh menghapus review ini!",
    review_add_success: "Review berhasil dibuat!",
    review_update_success: "Review berhasil diubah!",
    review_delete_success: "Review berhasil dihapus!",

    // Profile errors
    profile_not_login: "Anda belum login!",
    profile_exists: "Profile sudah ada!",
    profile_not_found: "Profile tidak ditemukan!",

    // Upload errors
    upload_not_login: "Anda belum login!",
    upload_success: "Avatar berhasil diupload",

    // 2FA errors
    two_fa_secret_not_found: "Secret tidak ditemukan!",
    two_fa_code_wrong: "Kode verifikasi salah!",
    two_fa_enabled: "2FA berhasil diaktifkan",
    two_fa_disabled: "2FA berhasil dinonaktifkan",

    // Validation errors
    validation_empty: "{field} tidak boleh kosong!",
    validation_current_password_empty: "Kata sandi saat ini tidak boleh kosong!",
    validation_new_password_empty: "Kata sandi baru tidak boleh kosong!",
    validation_confirm_password_empty: "Konfirmasi Kata sandi tidak boleh kosong!",
    validation_password_mismatch: "Kata sandi baru dan Konfirmasi Kata sandi tidak sama!",

    // Profile form errors
    profile_date_required: "Tanggal lahir wajib diisi!",
  },
};

// Get current language from localStorage or default to 'id'
const getCurrentLanguage = () => {
  return localStorage.getItem("i18nextLng") || "id";
};

// Get error message by key
export const getMockupError = (key, replacements = {}) => {
  const lang = getCurrentLanguage();
  // Key is already in lower_snake_case format
  let message = errorMessages[lang]?.[key] || errorMessages.en[key] || key;

  // Replace placeholders like {field}
  Object.entries(replacements).forEach(([placeholder, value]) => {
    message = message.replace(`{${placeholder}}`, value);
  });

  return message;
};

// Export error messages for direct use if needed
export { errorMessages };
