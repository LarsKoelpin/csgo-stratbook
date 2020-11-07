import { Component, Prop, Vue, Emit } from 'vue-property-decorator';
import { Strat, Step } from '@/services/models';
import StratItem from '@/components/StratItem/StratItem.vue';
import { Filters } from '@/store/modules/filter';

@Component({
  components: {
    StratItem,
  },
})
export default class StratList extends Vue {
  @Prop() strats!: Strat[];
  @Prop() filters!: Filters

  private get filteredStrats() {
    return this.strats
      .filter(strat => {
        return this.filters.side ? strat.side === this.filters.side : true;
      })
      .filter(strat => {
        return this.filters.type ? strat.type === this.filters.type : true;
      })
      .filter(strat => {
        return this.filters.name ? strat.name.toLowerCase().includes(this.filters.name.toLowerCase()) : true;
      });
  }

  // Emitted through from strat-item
  @Emit()
  private deleteStrat(stratID: string) {
    return stratID;
  }

  // Emitted through from strat-item
  @Emit()
  private toggleActive(payload: Partial<Strat>) {
    return payload;
  }

  // Emitted through from strat-item
  @Emit()
  private updateStep(payload: Partial<Step>) {
    return payload;
  }

  // Emitted through from strat-item
  @Emit()
  private addStep(payload: any) {
    return payload;
  }

  // Emitted through from strat-item
  @Emit()
  private editStrat(strat: Strat) {
    return strat;
  }

  // Emitted through from strat-item
  @Emit()
  private deleteStep(stepID: string) {
    return stepID;
  }
}