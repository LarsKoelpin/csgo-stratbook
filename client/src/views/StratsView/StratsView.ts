import { Component, Provide, Vue } from 'vue-property-decorator';
import MapPicker from '@/components/MapPicker/MapPicker.vue';
import StratList from '@/components/StratList/StratList.vue';
import FloatingAdd from '@/components/FloatingAdd/FloatingAdd.vue';
import StratForm from '@/components/StratForm/StratForm.vue';
import StratFilterForm from '@/components/StratFilterForm/StratFilterForm.vue';
import FilterMenu from '@/components/FilterMenu/FilterMenu.vue';
import FilterButton from '@/components/FilterButton/FilterButton.vue';
import { Dialog } from '@/components/DialogWrapper/DialogWrapper.models';
import { appModule, mapModule, stratModule, filterModule, teamModule } from '@/store/namespaces';
import { StratFilters } from '@/store/modules/filter';
import { Strat } from '@/api/models/Strat';
import { Player } from '@/api/models/Player';
import { StratTypes } from '@/api/models/StratTypes';
import { Sides } from '@/api/models/Sides';
import { MapID } from '@/components/MapPicker/MapPicker';
import UtilityLightbox from '@/components/UtilityLightbox/UtilityLightbox.vue';
import { Utility } from '@/api/models/Utility';

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
  },
})
export default class StratsView extends Vue {
  @Provide('lightbox') showLightboxFunc = this.showLightbox;

  @mapModule.State currentMap!: MapID;
  @stratModule.Getter stratsOfCurrentMap!: Strat[];
  @filterModule.State stratFilters!: StratFilters;
  @teamModule.State teamMembers!: Player[];

  @filterModule.Action updateStratContentFilter!: (value: string) => Promise<void>;
  @filterModule.Action updateStratTypeFilter!: (type: StratTypes | null) => Promise<void>;
  @filterModule.Action updateStratNameFilter!: (name: string) => Promise<void>;
  @filterModule.Action updateStratSideFilter!: (side: Sides | null) => Promise<void>;
  @filterModule.Action clearStratFilters!: () => Promise<void>;

  @mapModule.Action updateCurrentMap!: (mapID: MapID) => Promise<void>;
  @stratModule.Action updateStrat!: (payload: Partial<Strat>) => Promise<void>;
  @stratModule.Action createStrat!: (payload: Partial<Strat>) => Promise<void>;
  @stratModule.Action deleteStrat!: (stratID: string) => Promise<void>;
  @stratModule.Action shareStrat!: (stratID: string) => Promise<void>;
  @stratModule.Action unshareStrat!: (stratID: string) => Promise<void>;
  @appModule.Action showDialog!: (dialog: Partial<Dialog>) => Promise<void>;

  private stratFormOpen: boolean = false;
  private stratFormEditMode: boolean = false;
  private editStrat: Strat | null = null;
  private lightboxOpen: boolean = false;
  private currentLightboxUtility: Utility | null = null;
  private filterMenuOpen: boolean = false;

  private stratFormSubmitted(data: Partial<Strat>) {
    if (data._id) {
      this.updateStrat(data);
    } else {
      this.createStrat(data);
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

  private toggleFilterMenu() {
    this.filterMenuOpen = !this.filterMenuOpen;
  }

  private requestDeleteStrat(stratID: string) {
    this.showDialog({
      key: 'strats-view/confirm-delete',
      text: 'Are you sure you want to delete this strat?',
    }).then(() => this.deleteStrat(stratID));
  }

  private requestShareStrat(stratID: string) {
    this.showDialog({
      key: 'strats-view/confirm-share',
      text: 'Do you want to create a share-link to let other teams add this strat to their stratbook?',
    }).then(() => this.shareStrat(stratID));
  }

  private updateContent(payload: Partial<Strat>) {
    this.updateStrat(payload);
  }

  private get sortedStrats(): Strat[] {
    return this.stratsOfCurrentMap.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  private showLightbox(utility: Utility) {
    this.currentLightboxUtility = utility;
    this.lightboxOpen = true;
  }

  private hideLightbox() {
    this.currentLightboxUtility = null;
    this.lightboxOpen = false;
  }
}
