import { MapID } from '@/components/MapPicker/MapPicker';
import { Model } from './Model';
import { Sides } from './Sides';
import { StratTypes } from './StratTypes';

export interface Strat extends Model {
  name: string;
  type: StratTypes;
  map: MapID;
  side: Sides;
  active: boolean;
  videoLink?: string;
  note?: string;
  drawData?: string;
  createdBy: string;
  createdAt: Date;
  modifiedBy: string;
  modifiedAt: Date;
  content: string;
  shared: boolean;
}
