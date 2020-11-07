import { Component, Emit, Vue } from 'vue-property-decorator';
import { resolveAvatar } from '@/utils/resolveUrls';
import ago from 's-ago';
import { authModule, teamModule } from '@/store/namespaces';
import { Player, Team } from '@/services/models';


@Component({})
export default class MemberList extends Vue {
  @teamModule.State private teamInfo!: Team;
  @teamModule.State private teamMembers!: Player[];
  @authModule.State private profile!: Player;

  private resolveAvatar: (url?: string) => string = resolveAvatar;

  @Emit()
  private leaveTeam(): void {
    return;
  }

  private lastOnlineString(lastOnline: Date): string | undefined {
    if (!lastOnline) return;
    const date = new Date(lastOnline);
    return ago(date);
  }
}