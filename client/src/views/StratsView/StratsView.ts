import { Component, Provide, Vue } from 'vue-property-decorator';
import MapPicker from '@/components/MapPicker/MapPicker.vue';
import StratList from '@/components/StratList/StratList.vue';
import FloatingAdd from '@/components/FloatingAdd/FloatingAdd.vue';
import StratForm from '@/components/StratForm/StratForm.vue';
import StratFilterForm from '@/components/StratFilterForm/StratFilterForm.vue';
import FilterMenu from '@/components/FilterMenu/FilterMenu.vue';
import FilterButton from '@/components/FilterButton/FilterButton.vue';
import DrawTool from '@/components/DrawTool/DrawTool.vue';
import { Dialog } from '@/components/DialogWrapper/DialogWrapper.models';
import { appModule, mapModule, stratModule, filterModule, teamModule, authModule } from '@/store/namespaces';
import { StratFilters } from '@/store/modules/filter';
import { Strat } from '@/api/models/Strat';
import { Player } from '@/api/models/Player';
import { StratTypes } from '@/api/models/StratTypes';
import { Sides } from '@/api/models/Sides';
import { MapID } from '@/components/MapPicker/MapPicker';
import UtilityLightbox from '@/components/UtilityLightbox/UtilityLightbox.vue';
import { Utility } from '@/api/models/Utility';
import { catchPromise } from '@/utils/catchPromise';

@Component({
  components: {
    MapPicker,
    StratList,
    FloatingAdd,
    StratForm,
    StratFilterForm,
    FilterButton,
    UtilityLightbox,
    FilterMenu,
    DrawTool,
  },
})
export default class StratsView extends Vue {
  @Provide('lightbox') showLightboxFunc = this.showLightbox;

  @mapModule.State currentMap!: MapID;
  @stratModule.Getter sortedFilteredStratsOfCurrentMap!: Strat[];
  @filterModule.State stratFilters!: StratFilters;
  @filterModule.Getter activeStratFilterCount!: number;
  @teamModule.State teamMembers!: Player[];
  @authModule.State profile!: Player;

  @filterModule.Action updateStratContentFilter!: (value: string) => Promise<void>;
  @filterModule.Action updateStratTypeFilter!: (type: StratTypes | null) => Promise<void>;
  @filterModule.Action updateStratNameFilter!: (name: string) => Promise<void>;
  @filterModule.Action updateStratSideFilter!: (side: Sides | null) => Promise<void>;
  @filterModule.Action clearStratFilters!: () => Promise<void>;

  @authModule.Action updateProfile!: (formData: FormData) => Promise<void>;
  @mapModule.Action updateCurrentMap!: (mapID: MapID) => Promise<void>;
  @stratModule.Action updateStrat!: (payload: Partial<Strat>) => Promise<void>;
  @stratModule.Action createStrat!: (payload: Partial<Strat>) => Promise<Strat>;
  @stratModule.Action deleteStrat!: (stratID: string) => Promise<void>;
  @stratModule.Action shareStrat!: (stratID: string) => Promise<void>;
  @stratModule.Action unshareStrat!: (stratID: string) => Promise<void>;
  @appModule.Action showDialog!: (dialog: Partial<Dialog>) => Promise<void>;

  private stratFormOpen = false;
  private stratFormEditMode = false;
  private editStrat: Strat | null = null;
  private lightboxOpen = false;
  private currentLightboxUtility: Utility | null = null;
  private filterMenuOpen = false;
  private drawToolOpen = false;
  private currentDrawToolStrat: Strat | null = null;

  private tutorialStrat: Strat | null = null;

  private async stratFormSubmitted(data: Partial<Strat>) {
    if (data._id) {
      this.updateStrat(data);
    } else {
      const newStrat = await this.createStrat(data);
      if (!this.profile.completedTutorial) {
        this.tutorialStrat = newStrat;

        catchPromise(
          this.showDialog({
            key: 'strats-view/confirm-tutorial',
            text: `Hey there! Looks like you just created your first strat.<br>You can now edit the content of the strat by clicking the blinking box.<br>
              You can mention teammates with "<bold>@</bold>".<br>You can link utility from the nadebook with "<bold>#</bold>"<br>You can
              link weapons or equipment with "<bold>/</bold>".`,
            resolveBtn: 'OK',
            confirmOnly: true,
            htmlMode: true,
          }),
          () => {
            const formData = new FormData();
            formData.append('completedTutorial', 'true');
            this.updateProfile(formData);
          }
        );
      }
    }
    this.hideStratForm();
  }

  private showStratForm(strat: Strat) {
    this.stratFormOpen = true;
    this.editStrat = strat._id ? strat : null;
    this.stratFormEditMode = strat._id ? true : false;
  }

  private hideStratForm() {
    this.stratFormOpen = false;
  }

  private toggleStratActive(data: Partial<Strat>) {
    this.updateStrat(data);
  }

  private requestDeleteStrat(stratID: string) {
    catchPromise(
      this.showDialog({
        key: 'strats-view/confirm-delete',
        text: 'Are you sure you want to delete this strat?',
      }),
      () => this.deleteStrat(stratID)
    );
  }

  private requestShareStrat(stratID: string) {
    catchPromise(
      this.showDialog({
        key: 'strats-view/confirm-share',
        text: 'Do you want to create a share-link to let other teams add this strat to their stratbook?',
      }),
      () => this.shareStrat(stratID)
    );
  }

  private updateContent(payload: Partial<Strat>) {
    this.updateStrat(payload);
  }

  private showLightbox(utility: Utility) {
    this.currentLightboxUtility = utility;
    this.lightboxOpen = true;
  }

  private hideLightbox() {
    this.currentLightboxUtility = null;
    this.lightboxOpen = false;
  }

  private showDrawTool(strat: Strat) {
    this.currentDrawToolStrat = strat;
    this.drawToolOpen = true;
  }

  // * unused
  private submitDrawing(data: Partial<Strat>) {
    this.updateStrat(data);
    this.currentDrawToolStrat = null;
    this.drawToolOpen = false;
  }
}
