
window.toast = {
    showToast(msg, id = '#success-toast') {
        if(!msg) return;
        const toastElement = document.querySelector(id);
        const toast = window.bootstrap.Toast.getOrCreateInstance(toastElement);
        toastElement.querySelector('.toast-body').textContent = msg;
        toast.show()
        const t = setTimeout(() => {
            toast.hide()
            clearTimeout(t)
        }, 5000)
    },
}