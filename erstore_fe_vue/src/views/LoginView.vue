
<template>
  <div class="page-header breadcrumb-wrap">
    <div class="container">
      <div class="breadcrumb">
        <router-link :to="{ name: 'home' }" rel="nofollow">Trang chủ</router-link>
        <!-- <a href="index.html" rel="nofollow">Home</a> -->
        <span></span>
        <a style="pointer-events: none">Đăng nhập</a>
      </div>
    </div>
  </div>
  <section class="pt-50 pb-150">
    <div class="container">
      <div class="row">
        <div class="col-lg-6 col-md-8 m-auto">
          <div
            class="login_wrap widget-taber-content p-30 background-white border-radius-10 mb-md-5 mb-lg-0 mb-sm-5"
          >
            <div class="padding_eight_all bg-white">
              <div class="heading_s1">
                <h2 class="mb-30 title">ĐĂNG NHẬP TÀI KHOẢN</h2>
              </div>
              <form @submit.prevent="handleLogin">
                <div class="form-group mb-3">
                  <label for="" class="input-label">Tài khoản Email</label>
                  <input
                    type="text"
                    name="email"
                    placeholder="abc@gmail.com"
                    class="form-control"
                    @blur="validateEmail()"
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
                    placeholder="Nhập mật khẩu"
                    class="form-control"
                    @blur="validatePassword()"
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
                <div class="login_footer form-group">
                  <div class="chek-form">
                    <div class="custome-checkbox">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        name="checkbox"
                        id="exampleCheckbox1"
                        value=""
                      />
                      <label class="form-check-label" for="exampleCheckbox1"
                        ><span>Ghi nhớ</span></label
                      >
                    </div>
                  </div>
                  <a class="text-muted remember" href="#"><label for="">Quên mật khẩu?</label></a>
                </div>
                <div class="form-group">
                  <button
                    type="submit"
                    class="btn btn-fill-out btn-block hover-up w-100 fw-bold"
                    name="login"
                  >
                    ĐĂNG NHẬP
                  </button>
                </div>
              </form>
              <div class="register pt-30 text-center">
                <h5 class="fw-normal" style="font-size: 18px">
                  Chưa có tài khoản?
                  <router-link :to="{ name: 'register' }" class="fw-bold">
                    ĐĂNG KÝ NGAY</router-link
                  >
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
import { useLoginStore } from '../stores/login.store'
import { useRouter } from 'vue-router'
export default {
  name: 'LoginView',
  data() {},
  methods: {},
  setup() {
    const loginStore = useLoginStore()
    const router = useRouter()
    const form = ref({
      email: '',
      password: ''
    })
    const errors = ref({
      email: '',
      password: ''
    })
    const validateEmail = () => {
      if (!form.value.email) {
        errors.value.email = 'Email bắt buộc nhập!'
      } else {
        errors.value.email = ''
      }
    }
    const validatePassword = () => {
      // password
      if (!form.value.password) {
        errors.value.password = 'Mật khẩu bắt buộc nhập!'
      } else {
        errors.value.password = ''
      }
    }
    const handleLogin = async () => {
      validateEmail()
      validatePassword()
      // termsAccepted
      if (!errors.value.email && !errors.value.password) {
        // Xử lý form hợp lệ, chẳng hạn như gửi dữ liệu đến server
        const success = await loginStore.login(form.value)
        if (success) {
          alert('Đăng nhập thành công')
          router.push('/')
        } else {
          // alert(`Đăng ký thất bại, xảy ra lỗi. Vui lòng thực hiện lại.`)
        }
      }
    }

    return {
      form,
      errors,
      loginStore,
      router,
      validateEmail,
      validatePassword,
      handleLogin
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
  color: #3984e3 !important;
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
.remember {
  font-size: 16px;
  color: #3984e3 !important;
}
.remember:hover {
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