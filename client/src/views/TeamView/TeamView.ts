import { Component, Vue } from 'vue-property-decorator';
import MemberList from './components/MemberList/MemberList.vue';
import TeamInfo from './components/TeamInfo/TeamInfo.vue';
import { appModule, teamModule } from '@/store/namespaces';
import { Dialog } from '@/components/DialogWrapper/DialogWrapper.models';
import { Response } from '@/store';
import { Routes } from '@/router/router.models';

@Component({
  components: {
    MemberList,
    TeamInfo
  },
})
export default class TeamView extends Vue {
  @teamModule.Getter private teamAvatarUrl!: string;
  @teamModule.Action leaveTeam!: () => Promise<Response>;
  @teamModule.Action transferManager!: (memberID: string) => Promise<Response>;
  @teamModule.Action kickMember!: (memberID: string) => Promise<Response>;
  @appModule.Action showDialog!: (dialog: Partial<Dialog>) => Promise<void>;

  private requestTeamLeave() {
    this.showDialog({
      key: 'team-view/confirm-leave',
      text: 'Are you sure you want to leave your team?',
    })
    .then(async () => {
      const res = await this.leaveTeam();
      if (res.success) this.$router.push(Routes.JoinTeam);
    })
    .catch(() => null);
  }

  private requestTransferManager(memberID: string) {
    this.showDialog({
      key: 'team-view/confirm-transfer',
      text: 'Are you sure you want to transfer team leadership?',
    })
    .then(() => this.transferManager(memberID))
    .catch(() => null);
  }

  private requestKickMember(memberID: string) {
    this.showDialog({
      key: 'team-view/confirm-kick',
      text: 'Are you sure you want to kick this player?',
    })
    .then(() => this.kickMember(memberID))
    .catch(() => null);
  }

}
