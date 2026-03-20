// دالة للتبديل بين واجهة الدخول وواجهة التسجيل
function toggleForms() {
    document.getElementById('loginFormContainer').classList.toggle('hidden');
    document.getElementById('registerFormContainer').classList.toggle('hidden');
    hideAlert(); // إخفاء أي رسائل خطأ سابقة عند التبديل
}

// دالة لعرض رسائل التنبيه (نجاح أو خطأ)
function showAlert(message, type) {
    const alertBox = document.getElementById('alertBox');
    alertBox.textContent = message;
    alertBox.className = `mb-4 p-3 rounded text-center font-bold text-sm block ${type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`;
}

function hideAlert() {
    document.getElementById('alertBox').classList.add('hidden');
}

// معالجة إنشاء حساب جديد
function handleRegister(event) {
    event.preventDefault(); // منع إعادة تحميل الصفحة

    const name = document.getElementById('regName').value.trim();
    const email = document.getElementById('regEmail').value.trim();
    const password = document.getElementById('regPassword').value;

    // جلب المستخدمين الحاليين أو إنشاء مصفوفة فارغة
    let users = JSON.parse(localStorage.getItem('users')) || [];

    // التحقق مما إذا كان البريد الإلكتروني مسجلاً مسبقاً
    const userExists = users.some(user => user.email === email);
    
    if (userExists) {
        showAlert('البريد الإلكتروني مسجل مسبقاً!', 'error');
        return;
    }

    // حفظ المستخدم الجديد
    users.push({ name, email, password });
    localStorage.setItem('users', JSON.stringify(users));

    showAlert('تم إنشاء الحساب بنجاح! يمكنك تسجيل الدخول الآن.', 'success');
    document.getElementById('registerForm').reset();
    
    // التبديل لشاشة الدخول بعد ثانيتين
    setTimeout(toggleForms, 2000);
}

// معالجة تسجيل الدخول
function handleLogin(event) {
    event.preventDefault();

    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value;

    let users = JSON.parse(localStorage.getItem('users')) || [];

    // البحث عن المستخدم والتحقق من كلمة المرور
    const validUser = users.find(user => user.email === email && user.password === password);

    if (validUser) {
        showAlert(`أهلاً بك يا ${validUser.name}! تم تسجيل الدخول بنجاح.`, 'success');
        // هنا يمكنك توجيه المستخدم لصفحة أخرى مثلاً:
        // window.location.href = "dashboard.html";
    } else {
        showAlert('البريد الإلكتروني أو كلمة المرور غير صحيحة!', 'error');
    }
}