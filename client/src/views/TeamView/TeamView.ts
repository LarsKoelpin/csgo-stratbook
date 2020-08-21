import { Component, Vue, Ref } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import TeamCreateForm from '@/components/team-create-form/team-create-form.vue';
import JoinTeamForm from '@/components/join-team-form/join-team-form.vue';
import TeamInfo from '@/components/team-info/team-info.vue';
import { TeamCreateFormData } from '@/components/team-create-form/team-create-form';
import { Player, Response, Team } from '@/services/models';
import { FormComponent } from '@/interfaces';

const teamModule = namespace('team');
const authModule = namespace('auth');

@Component({
  components: {
    TeamCreateForm,
    JoinTeamForm,
    TeamInfo,
  },
})
export default class TeamView extends Vue {
  @authModule.State profile!: Player;
  @teamModule.State teamInfo!: Team;
  @authModule.Action fetchProfile!: () => Promise<Player>;
  @teamModule.Action createTeam!: (formData: TeamCreateFormData) => Promise<Response>;
  @teamModule.Action joinTeam!: (code: string) => Promise<Response>;
  @teamModule.Action leaveTeam!: () => Promise<Response>;
  @teamModule.Action fetchTeamInfo!: () => Promise<void>;
  @Ref('create-form') createForm!: FormComponent;
  @Ref('join-form') joinForm!: FormComponent;

  private async createTeamRequest(formData: TeamCreateFormData) {
    const res = await this.createTeam(formData);
    if (res.error) {
      this.createForm.updateFormMessage(res.error, 'error');
    } else if (res.success) {
      this.createForm.updateFormMessage(res.success, 'success');
      setTimeout(() => {
        this.createForm.updateFormMessage(null, null);
        this.fetchTeamInfo();
      }, 3000);
    }
  }

  private async joinTeamRequest(code: string) {
    console.log('teamview');
    const res = await this.joinTeam(code);
    if (res.error) {
      this.joinForm.updateFormMessage(res.error, 'error');
    } else if (res.success) {
      this.joinForm.updateFormMessage(res.success, 'success');
      setTimeout(() => {
        this.joinForm.updateFormMessage(null, null);
        this.fetchTeamInfo();
      }, 3000);
    }
  }

  private async leaveTeamRequest() {
    this.leaveTeam();
  }
}
