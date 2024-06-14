<template>
  <div class="page-header breadcrumb-wrap">
    <div class="container">
      <div class="breadcrumb">
        <router-link :to="{ name: 'home' }" rel="nofollow">Trang chủ</router-link>
        <!-- <a href="index.html" rel="nofollow">Home</a> -->
        <span></span> Tạo tài khoản
      </div>
    </div>
  </div>
  <section class="pt-30">
    <div class="container">
      <div class="row">
        <div class="col-lg-6 col-md-8 m-auto">
          <div
            class="login_wrap widget-taber-content p-30 background-white border-radius-10 mb-md-5 mb-lg-0 mb-sm-5"
          >
            <div class="padding_eight_all bg-white">
              <div class="heading_s1">
                <h2 class="mb-30 title">TẠO TÀI KHOẢN</h2>
              </div>
              <form @submit.prevent="handleRegister">
                <div class="form-group">
                  <label for="" class="input-label">Họ & tên</label>
                  <input type="text" name="name" placeholder="..." v-model="form.name" />
                </div>
                <div class="form-group">
                  <label for="" class="input-label">Số điện thoại</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="0123456789"
                    class="form-control"
                    @blur="validatePhone"
                    v-model="form.phone"
                    v-bind:class="{
                      'is-invalid': errors.phone
                    }"
                  />
                  <span class="invalid-feedback" v-if="errors.phone"
                    ><font-awesome-icon icon="circle-exclamation" class="me-2" />{{
                      errors.phone
                    }}</span
                  >
                </div>
                <div class="form-group">
                  <label for="" class="input-label">Tài khoản Email</label>
                  <input
                    type="text"
                    name="email"
                    placeholder="abc@gmail.com"
                    class="form-control"
                    @blur="validateEmail"
                    v-model="form.email"
                    v-bind:class="{
                      'is-invalid': errors.email
                    }"
                  />
                  <span class="invalid-feedback" v-if="errors.email"
                    ><font-awesome-icon icon="circle-exclamation" class="me-2" />{{
                      errors.email
                    }}</span
                  >
                </div>
                <div class="form-group">
                  <label for="" class="input-label">Mật khẩu</label>
                  <input
                    type="password"
                    name="password"
                    placeholder="..."
                    class="form-control"
                    @blur="validatePassword"
                    v-model="form.password"
                    v-bind:class="{
                      'is-invalid': errors.password
                    }"
                  />
                  <span class="invalid-feedback" v-if="errors.password"
                    ><font-awesome-icon icon="circle-exclamation" class="me-2" />{{
                      errors.password
                    }}</span
                  >
                </div>
                <div class="form-group">
                  <label for="" class="input-label">Xác nhận mật khẩu</label>
                  <input
                    type="password"
                    name="password_confirmation"
                    placeholder="Nhập lại mật khẩu"
                    class="form-control"
                    @blur="validatePassword()"
                    v-model="form.password_confirmation"
                    v-bind:class="{
                      'is-invalid': errors.password_confirmation
                    }"
                  />
                  <span class="invalid-feedback" v-if="errors.password_confirmation"
                    ><font-awesome-icon icon="circle-exclamation" class="me-2" />{{
                      errors.password_confirmation
                    }}</span
                  >
                </div>
                <div class="login_footer form-group">
                  <div class="chek-form">
                    <div
                      class="custome-checkbox"
                      v-bind:class="{
                        'is-invalid': errors.termsAccepted
                      }"
                    >
                      <input
                        class="form-check-input"
                        type="checkbox"
                        name="checkbox"
                        id="exampleCheckbox12"
                        value=""
                        v-model="form.termsAccepted"
                      />
                      <label class="form-check-label" for="exampleCheckbox12"
                        ><span
                          >Tôi đồng ý với
                          <a href="privacy-policy.html" rel="nofollow"
                            >điều khoản &amp; Chính sách.</a
                          ></span
                        ></label
                      >
                    </div>
                    <span class="invalid-feedback" v-if="errors.termsAccepted"
                      ><font-awesome-icon icon="circle-exclamation" class="me-2" />{{
                        errors.termsAccepted
                      }}</span
                    >
                  </div>
                </div>
                <div class="form-group">
                  <button
                    type="submit"
                    class="btn btn-fill-out btn-block hover-up w-100 fw-bold"
                    name="register"
                  >
                    ĐĂNG KÝ
                  </button>
                </div>
              </form>
              <div class="register pt-30 text-center">
                <h5 class="fw-normal" style="font-size: 18px">
                  Đã có tài khoản?
                  <router-link :to="{ name: 'login' }" class="fw-bold"> ĐĂNG NHẬP</router-link>
                </h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { ref } from 'vue'
import { useRegisterStore } from '../stores/register.store'
import { useRouter } from 'vue-router'
export default {
  name: 'RegisterView',
  data() {
    return {}
  },
  methods: {},
  setup() {
    const registerStore = useRegisterStore()
    const router = useRouter()
    const form = ref({
      name: '',
      phone: '',
      email: '',
      password: '',
      password_confirmation: ''
    })
    const errors = ref({
      email: '',
      phone: '',
      password: '',
      password_confirmation: '',
      termsAccepted: false
    })
    const validatePhone = () => {
      const isNumeric = /^\d+$/.test(form.value.phone)
      if (!form.value.phone) {
        errors.value.phone = 'Số điện thoại bắt buộc nhập!'
      } else if (!isNumeric) {
        errors.value.phone = 'Số điện thoại phải là số'
      } else if (form.value.phone.length < 8 || form.value.phone.length > 11) {
        errors.value.phone = 'Số điện thoại phải có độ dài 8-11 ký tự'
      } else {
        errors.value.phone = ''
      }
    }
    const validateEmail = () => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!form.value.email) {
        errors.value.email = 'Email bắt buộc nhập!'
      } else if (!emailRegex.test(form.value.email) && form.value.email) {
        errors.value.email = 'Định dạng mail không đúng'
      } else {
        errors.value.email = ''
      }
    }
    const validatePassword = () => {
      // password
      if (!form.value.password) {
        errors.value.password = 'Mật khẩu bắt buộc nhập!'
      } else if (form.value.password.length < 8 || form.value.password.length > 20) {
        errors.value.password = 'Mật khẩu phải có độ dài 8-20 ký tự'
      } else {
        errors.value.password = ''
        if (form.value.password_confirmation !== form.value.password_confirmation) {
          errors.value.password_confirmation = 'Mật khẩu xác nhận không khớp!'
        } else {
          errors.value.password_confirmation = ''
        }
      }
    }
    const handleRegister = async () => {
      validatePhone()
      validateEmail()
      validatePassword()
      // termsAccepted
      if (!form.value.termsAccepted) {
        errors.value.termsAccepted = 'Bạn phải đồng ý với điều khoản'
      } else {
        errors.value.termsAccepted = ''
      }
      if (
        !errors.value.phone &&
        !errors.value.email &&
        !errors.value.password &&
        !errors.value.confirm_password &&
        !errors.value.termsAccepted
      ) {
        // Xử lý form hợp lệ, chẳng hạn như gửi dữ liệu đến server
        const success = await registerStore.register(form.value)
        if (success) {
          alert('Đăng ký tài khoản thành công')
          router.push('/login')
        } else {
          // alert(`Đăng ký thất bại, xảy ra lỗi. Vui lòng thực hiện lại.`)
        }
      }
    }

    return {
      form,
      errors,
      registerStore,
      router,
      validatePhone,
      validateEmail,
      validatePassword,
      handleRegister
    }
  }
}
</script>

<style scoped>
.page-header {
  background-color: #ebe8e2;
  font-size: 1rem;
}
.page-header a {
  font-size: 1rem;
}
.login_wrap {
  background-color: #fff;
  box-shadow: 1px 1px 2px #a4a1a1;
  border: none;
  margin: 0 20px;
}
input {
  font-size: 20px;
  height: 60px;
  border: 3px solid #d2d4d5;
}
input::placeholder {
  font-size: 18px;
  opacity: 0.8;
}
label {
  font-size: 18px;
  /* color: #3984e3 !important; */
}
.input-label {
  font-size: 20px;
  font-weight: bold;
  color: #6f6c6c !important;
}
.invalid-feedback {
  font-size: 1.2em;
}
.title {
  font-weight: bold;
  color: #39b4ac;
}
.form-check-label a {
  font-weight: 600;
  color: #3984e3 !important;
}
.form-check-label a:hover {
  color: #f15412 !important;
}
.register h5 {
  color: #a4a1a1;
}
.register a {
  color: #3984e3 !important;
}
.register a:hover {
  color: #f15412 !important;
}
</style>