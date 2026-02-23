// src/utils/swal.js
import Swal from "sweetalert2";

export const SwalError = Swal.mixin({
  customClass: {
    popup: "rounded-xl p-6 bg-red-50 shadow-lg",
    title: "text-xl font-bold text-center mb-2 text-red-800",
    htmlContainer: "text-gray-700 text-center",
    actions: "flex flex-col sm:flex-row gap-3 mt-4",
    confirmButton:
      "bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded cursor-pointer w-full sm:w-auto",
  },
  buttonsStyling: false,
  confirmButtonText: "Aceptar",
   iconColor: "#dc2626",
});

export const SwalSuccess = Swal.mixin({
  customClass: {
    popup: "rounded-xl p-6 bg-green-50 shadow-lg",
    title: "text-xl font-bold text-center mb-2 text-green-800",
    htmlContainer: "text-gray-700 text-center",
    actions: "flex flex-col sm:flex-row gap-3 mt-4",
    confirmButton:
      "bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded cursor-pointer w-full sm:w-auto",
  },
  buttonsStyling: false,
  confirmButtonText: "Aceptar",
  iconColor: "#16a34a"
});

export const SwalWarning = Swal.mixin({
  customClass: {
    popup: "rounded-xl p-6 shadow-lg",
    title: "text-xl font-bold text-center mb-2 text-red-800",
    htmlContainer: "text-gray-700 text-center",
    actions: "flex flex-col sm:flex-row gap-3 mt-4",
    confirmButton:
      "bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded cursor-pointer w-full sm:w-auto",
    cancelButton:
      "bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded cursor-pointer w-full sm:w-auto",
  },
  buttonsStyling: false,
  confirmButtonText: "Confirmar",
  cancelButtonText: "Cancelar",
  iconColor: "#ca8a04"
});
