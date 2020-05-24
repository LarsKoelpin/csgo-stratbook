import { Component, Vue, Ref } from 'vue-property-decorator';
import LoginForm from '@/components/login-form/login-form.vue';

@Component({
  name: 'LoginView',
  components: {
    LoginForm,
  },
})
export default class LoginView extends Vue {
  private formMessage: string | null = null;
  private formMessageStyle: string | null = null;

  private async loginRequest(payload: any) {
    const res = await this.$store.dispatch('loginUser', {
      email: payload.email,
      password: payload.password,
    });
    if (res.error) {
      this.formMessage = res.error;
      this.formMessageStyle = 'error';
    } else if (res.success) {
      this.formMessage = res.success;
      this.formMessageStyle = 'success';
      setTimeout(() => {
        this.formMessage = null;
        this.formMessageStyle = null;
        this.$router.push({ name: 'Strats' });
      }, 3000);
    }
  }
}
