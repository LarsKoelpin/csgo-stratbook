import { Component, Vue } from 'vue-property-decorator';
import MapPicker from '@/components/MapPicker/MapPicker.vue';
import FloatingAdd from '@/components/FloatingAdd/FloatingAdd.vue';
import UtilityForm from '@/components/UtilityForm/UtilityForm.vue';
import UtilityList from '@/components/UtilityList/UtilityList.vue';
import UtilityLightbox from '@/components/UtilityLightbox/UtilityLightbox.vue';
import FilterButton from '@/components/FilterButton/FilterButton.vue';
import UtilityFilterForm from '@/components/UtilityFilterForm/UtilityFilterForm.vue';
import FilterMenu from '@/components/FilterMenu/FilterMenu.vue';
import { appModule, filterModule, mapModule, utilityModule } from '@/store/namespaces';
import { MapID } from '@/components/MapPicker/MapPicker';
import { Utility } from '@/api/models/Utility';
import { Dialog } from '@/components/DialogWrapper/DialogWrapper.models';
import { UtilityTypes } from '@/api/models/UtilityTypes';
import { Sides } from '@/api/models/Sides';
import { UtilityFilters } from '@/store/modules/filter';
import { catchPromise } from '@/utils/catchPromise';

@Component({
  components: {
    MapPicker,
    FloatingAdd,
    UtilityForm,
    UtilityList,
    UtilityLightbox,
    FilterButton,
    UtilityFilterForm,
    FilterMenu,
  },
})
export default class UtilityView extends Vue {
  @mapModule.State currentMap!: MapID;
  @utilityModule.Getter sortedFilteredUtilitiesOfCurrentMap!: Utility[];
  @mapModule.Action updateCurrentMap!: (mapID: MapID) => Promise<void>;
  @appModule.Action showDialog!: (dialog: Partial<Dialog>) => Promise<void>;

  @filterModule.State utilityFilters!: UtilityFilters;
  @filterModule.Getter activeUtilityFilterCount!: number;
  @filterModule.Action updateUtilityTypeFilter!: (type: UtilityTypes | null) => Promise<void>;
  @filterModule.Action updateUtilityNameFilter!: (name: string) => Promise<void>;
  @filterModule.Action updateUtilitySideFilter!: (side: Sides | null) => Promise<void>;
  @filterModule.Action clearUtilityFilters!: () => Promise<void>;

  @utilityModule.Action updateUtility!: (payload: FormData) => Promise<void>;
  @utilityModule.Action createUtility!: (payload: FormData) => Promise<void>;
  @utilityModule.Action deleteUtility!: (utilityID: string) => Promise<void>;
  @utilityModule.Action shareUtility!: (utilityID: string) => Promise<void>;
  @utilityModule.Action unshareUtility!: (utilityID: string) => Promise<void>;

  private utilityFormOpen = false;
  private utilityFormEditMode = false;
  private editUtility: Utility | null = null;
  private lightboxOpen = false;
  private currentLightboxUtility: Utility | null = null;
  private filterMenuOpen = false;

  private utilityFormSubmitted(data: FormData) {
    if (data.has('_id')) {
      this.updateUtility(data);
    } else {
      this.createUtility(data);
    }
    this.hideUtilityForm();
  }

  private requestDeleteUtility(utility: Utility) {
    catchPromise(
      this.showDialog({
        key: 'utility-view/confirm-delete',
        text: 'Are you sure you want to delete this utility?',
      }),
      () => this.deleteUtility(utility._id)
    );
  }

  private requestShareUtility(utility: Utility) {
    catchPromise(
      this.showDialog({
        key: 'utility-view/confirm-share',
        text: 'Do you want to create a share-link to let other teams add this utility to their stratbook?',
      }),
      () => this.shareUtility(utility._id)
    );
  }

  private showUtilityForm(utility: Utility) {
    this.utilityFormOpen = true;
    this.editUtility = utility._id ? utility : null;
    this.utilityFormEditMode = utility._id ? true : false;
  }

  private hideUtilityForm() {
    this.utilityFormOpen = false;
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
