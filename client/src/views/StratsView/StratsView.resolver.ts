import { NavigationGuard } from 'vue-router';
import store from '@/store';
import { APIResponse } from '@/services/APIService';
import { Strat, Map, Response } from '@/services/models';
import { authGuard } from '@/guards/auth.guard';
import { teamGuard } from '@/guards/team.guard';

export const stratsResolver: NavigationGuard = async (to, from, next) => {
  await store.dispatch('auth/fetchProfile');

  const authGuardResult: boolean = authGuard(to, from, next);
  if (!authGuardResult) return;
  const teamGuardResult: boolean = await teamGuard(to, from, next);
  if (!teamGuardResult) return;

  //* if there are maps loaded from localStorage load strats async, otherwise wait for result
  if (store.state.map.maps.length) {
    store.dispatch('map/fetchMaps');
  } else {
    const mapResponse: Response = await store.dispatch('map/fetchMaps');
    if (!mapResponse.success) {
      next(false);
      return;
    }
  }

  //* if there are strats loaded from localStorage load strats async, otherwise wait for result
  if (store.state.strat.strats.length) {
    store.dispatch('strat/fetchStrats');
  } else {
    const stratResponse: Response = await store.dispatch('strat/fetchStrats');
    if (!stratResponse.success) {
      next(false);
      return;
    }
  }

  next();
};