import { Sides } from '@/api/models/Sides';
import { Strat } from '@/api/models/Strat';
import { StratTypes } from '@/api/models/StratTypes';
import { Component, Prop, Vue, Emit } from 'vue-property-decorator';
import SidePicker from '@/components/SidePicker/SidePicker.vue';
import TypePicker from '@/components/TypePicker/TypePicker.vue';
import BackdropDialog from '@/components/BackdropDialog/BackdropDialog.vue';
import FormFieldSet from '@/components/FormFieldSet/FormFieldSet.vue';
import TextInput from '@/components/TextInput/TextInput.vue';
import { validateForm, Validators } from '@/utils/validation';
import FormField from '@/utils/FormField';

@Component({
  components: {
    SidePicker,
    BackdropDialog,
    TextInput,
    TypePicker,
    FormFieldSet,
  },
})
export default class StratForm extends Vue {
  @Prop() strat!: Strat;
  @Prop() isEdit!: boolean;

  private formFields: Record<string, FormField> = {
    name: new FormField('Name', true, [Validators.notEmpty(), Validators.maxLength(50)]),
    note: new FormField('Note', false, [Validators.maxLength(100)]),
    videoLink: new FormField('Video Link', false, [Validators.isURL()]),
  };

  private type: StratTypes = StratTypes.BUYROUND;
  private side: Sides = Sides.T;

  private mounted() {
    if (this.strat && this.isEdit) {
      this.mapToFields();
    }
  }

  private submitClicked() {
    if (validateForm(this.formFields)) {
      this.submitStrat();
    }
  }

  @Emit()
  private submitStrat(): Partial<Strat> {
    return {
      _id: this.isEdit ? this.strat._id : undefined,
      name: this.formFields.name.value,
      type: this.type,
      side: this.side,
      note: this.formFields.note.value,
      videoLink: this.formFields.videoLink.value,
    };
  }

  @Emit()
  private cancelClicked() {
    return;
  }

  private mapToFields() {
    this.formFields.name.value = this.strat.name;
    this.formFields.note.value = this.strat.note ?? '';
    this.formFields.videoLink.value = this.strat.videoLink ?? '';
    this.type = this.strat.type;
    this.side = this.strat.side;
  }
}
