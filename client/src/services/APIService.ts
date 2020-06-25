import axios from 'axios';
import urljoin from 'url-join';
import { Map, Strat, Step, Player } from '@/services/models';
import AuthService from './AuthService';

const url =
  process.env.NODE_ENV === 'production'
    ? 'https://csgo-stratbook.herokuapp.com/'
    : 'http://localhost:3000/';

enum Endpoints {
  MAPS = 'maps',
  STRATS = 'strats',
  PLAYERS = 'players',
  STEPS = 'steps',
  TEAMS = 'teams',
}

enum Actions {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  DELETE_ALL = 'deleteAll',
}

class APIService {
  /**
   * * MAPS
   */

  static async getAllMaps(): Promise<Map[]> {
    const target = urljoin(url, Endpoints.MAPS);
    const authService = AuthService.getInstance();
    const token = authService.getToken();
    console.log(target);
    try {
      const res = await axios.get(target, {
        headers: {
          Authorization: token,
        },
      });
      return res.data;
    } catch (error) {
      console.error(error.response.data.error);
      throw new Error(error.response.data.error);
    }
  }

  static async createMap(map: Map) {
    const target = urljoin(url, Endpoints.MAPS, Actions.CREATE);
    try {
      return await axios.post(target, map);
    } catch (error) {
      console.error(error.response.data.error);
      throw new Error(error.response.data.error);
    }
  }

  /**
   * * STRATS
   */

  static async getStratsOfMap(mapId: string) {
    const target = urljoin(url, Endpoints.STRATS);
    const authService = AuthService.getInstance();
    const token = authService.getToken();
    if (!token) throw 'User not logged in.';

    try {
      const res = await axios.get(target, {
        params: {
          map: mapId,
        },
        headers: {
          Authorization: token,
        },
      });
      const data = res.data;
      return data;
    } catch (error) {
      console.error(error.response.data.error);
      throw new Error(error.response.data.error);
    }
  }

  static async deleteStrat(stratId: string) {
    const target = urljoin(url, Endpoints.STRATS, stratId, Actions.DELETE);
    const authService = AuthService.getInstance();
    const token = authService.getToken();
    if (!token) throw 'User not logged in.';

    try {
      const res = await axios.delete(target, {
        headers: {
          Authorization: token,
        },
      });
      const data = res.data;
      return data;
    } catch (error) {
      console.error(error.response.data.error);
      throw new Error(error.response.data.error);
    }
  }

  static async createStrat(strat: Strat, mapId: string) {
    const newStrat = { ...strat, map: mapId };
    const target = urljoin(url, Endpoints.STRATS, Actions.CREATE);
    const authService = AuthService.getInstance();
    const token = authService.getToken();
    if (!token) throw 'User not logged in.';

    try {
      return await axios.post(target, newStrat, {
        headers: {
          Authorization: token,
        },
      });
    } catch (error) {
      console.error(error.response.data.error);
      throw new Error(error.response.data.error);
    }
  }

  static async updateStrat(stratId: string, changeObj: any) {
    const target = urljoin(url, Endpoints.STRATS, stratId, Actions.UPDATE);
    const authService = AuthService.getInstance();
    const token = authService.getToken();
    if (!token) throw 'User not logged in.';

    try {
      const res = await axios.patch(target, changeObj, {
        headers: {
          Authorization: token,
        },
      });
      const data = res.data;
      return data;
    } catch (error) {
      console.error(error.response.data.error);
      throw new Error(error.response.data.error);
    }
  }

  /**
   * * STEPS
   */

  static async getStepsOfStrat(stratId: string) {
    const target = urljoin(url, Endpoints.STEPS);
    const authService = AuthService.getInstance();
    const token = authService.getToken();
    if (!token) throw 'User not logged in.';

    try {
      const res = await axios.get(target, {
        params: {
          strat: stratId,
        },
        headers: {
          Authorization: token,
        },
      });
      return res.data;
    } catch (error) {
      console.error(error.response.data.error);
      throw new Error(error.response.data.error);
    }
  }

  static async updateStep(payload: any) {
    const target = urljoin(
      url,
      Endpoints.STEPS,
      payload.stepId,
      Actions.UPDATE
    );
    const authService = AuthService.getInstance();
    const token = authService.getToken();
    if (!token) throw 'User not logged in.';

    try {
      const res = await axios.patch(target, payload, {
        headers: {
          Authorization: token,
        },
      });
      return res.data;
    } catch (error) {
      console.error(error.response.data.error);
      throw new Error(error.response.data.error);
    }
  }

  static async addStep(payload: any) {
    const target = urljoin(url, Endpoints.STEPS, Actions.CREATE);
    const authService = AuthService.getInstance();
    const token = authService.getToken();
    if (!token) throw 'User not logged in.';
    try {
      const res = await axios.post(target, payload, {
        headers: {
          Authorization: token,
        },
      });
      return res.data;
    } catch (error) {
      console.error(error.response.data.error);
      throw new Error(error.response.data.error);
    }
  }

  static async deleteStep(stepId: string) {
    const target = urljoin(url, Endpoints.STEPS, stepId, Actions.DELETE);
    const authService = AuthService.getInstance();
    const token = authService.getToken();
    if (!token) throw 'User not logged in.';
    try {
      const res = await axios.delete(target, {
        headers: {
          Authorization: token,
        },
      });
      return res.data;
    } catch (error) {
      console.error(error.response.data.error);
      throw new Error(error.response.data.error);
    }
  }

  /**
   * * Players
   */

  static async getPlayer(playerId: string) {
    const target = urljoin(url, Endpoints.PLAYERS, playerId);
    const authService = AuthService.getInstance();
    const token = authService.getToken();
    if (!token) throw 'User not logged in.';
    try {
      const res = await axios.get(target, {
        headers: {
          Authorization: token,
        },
      });
      const data = res.data;
      return data;
    } catch (error) {
      console.error(error.response.data.error);
      throw new Error(error.response.data.error);
    }
  }

  static async updatePlayer(payload: any) {
    const target = urljoin(url, Endpoints.PLAYERS, Actions.UPDATE);
    const authService = AuthService.getInstance();
    const token = authService.getToken();
    if (!token) throw 'User not logged in.'; // TODO: throw new Error instead
    try {
      const res = await axios.patch(target, payload, {
        headers: {
          Authorization: token,
        },
      });
      console.log(res.data);
      return res.data;
    } catch (error) {
      console.error(error.response.data.error);
      throw new Error(error.response.data.error);
    }
  }

  /**
   * Teams
   */

  static async createTeam(formData: any) {
    const target = urljoin(url, Endpoints.TEAMS, Actions.CREATE);
    const authService = AuthService.getInstance();
    const token = authService.getToken();
    if (!token) throw 'User not logged in.';
    try {
      const res = await axios.post(target, formData, {
        headers: {
          Authorization: token,
        },
      });
      return { team: res.data };
    } catch (error) {
      console.error(error.response.data.error);
      throw new Error(error.response.data.error);
    }
  }

  static async joinTeam(code: string) {
    const target = urljoin(url, Endpoints.TEAMS, 'join');
    const authService = AuthService.getInstance();
    const token = authService.getToken();
    if (!token) throw 'User not logged in.';
    console.log(code);
    try {
      const res = await axios.patch(
        target,
        { code },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      return { team: res.data };
    } catch (error) {
      console.error(error.response.data.error);
      throw new Error(error.response.data.error);
    }
  }

  static async leaveTeam() {
    const target = urljoin(url, Endpoints.TEAMS, 'leave');
    const authService = AuthService.getInstance();
    const token = authService.getToken();
    if (!token) throw 'User not logged in.';
    try {
      const res = await axios.patch(
        target,
        {},
        {
          headers: {
            Authorization: token,
          },
        }
      );
      return { team: res.data };
    } catch (error) {
      console.error(error.response.data.error);
      throw new Error(error.response.data.error);
    }
  }

  static async getTeamOfPlayer(playerId: string) {
    const target = urljoin(url, Endpoints.PLAYERS, playerId, 'team');
    const authService = AuthService.getInstance();
    const token = authService.getToken();
    if (!token) throw 'User not logged in.';
    try {
      const res = await axios.get(target, {
        headers: {
          Authorization: token,
        },
      });
      const data = res.data;
      return data;
    } catch (error) {
      console.error(error.response.data.error);
      throw new Error(error.response.data.error);
    }
  }

  static async getMembersOfTeam(teamId: string) {
    const target = urljoin(url, Endpoints.TEAMS, teamId, 'players');
    const authService = AuthService.getInstance();
    const token = authService.getToken();
    if (!token) throw 'User not logged in.';
    try {
      const res = await axios.get(target, {
        headers: {
          Authorization: token,
        },
      });
      const data = res.data;
      return data;
    } catch (error) {
      console.error(error.response.data.error);
      throw new Error(error.response.data.error);
    }
  }
}

export default APIService;
