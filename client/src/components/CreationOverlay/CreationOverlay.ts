import { Component, Prop, Vue, Emit } from 'vue-property-decorator';
import { Strat, StratTypes, Sides } from '@/services/models';

@Component({})
export default class CreationOverlay extends Vue {
  @Prop() strat!: Strat;
  @Prop() isEdit!: boolean;

  // ! put in data object
  private name: string = '';
  private type: StratTypes = StratTypes.BUYROUND;
  private side: Sides = Sides.T;
  private note: string = '';
  private videoLink: string = '';
  private triedSubmitting: boolean = false;

  private mounted() {
    if (this.strat && this.isEdit) {
      this.mapToFields();
    }
  }

  get isInvalid() {
    return !this.isValid() && this.triedSubmitting;
  }

  private submitClicked() {
    if (this.isValid()) {
      this.$emit('submit-clicked', {
        _id: this.isEdit ? this.strat._id : null,
        name: this.name,
        type: this.type,
        side: this.side,
        note: this.note,
        videoLink: this.videoLink,
      } as Partial<Strat>);
    } else {
      this.triedSubmitting = true;
    }
  }

  @Emit()
  private cancelClicked() {}

  private isValid(): boolean {
    let valid = true;
    if (this.name === '' || this.name === undefined) valid = false;

    return valid;
  }

  private mapToFields() {
    this.name = this.strat.name;
    this.type = this.strat.type;
    this.side = this.strat.side;
    this.note = this.strat.note ?? '';
    this.videoLink = this.strat.videoLink ?? '';
  }

  private isTSide() {
    return this.side === Sides.T;
  }

  private selectT() {
    this.side = Sides.T;
  }

  private selectCT() {
    this.side = Sides.CT;
  }
}