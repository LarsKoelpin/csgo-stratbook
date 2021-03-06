import { MapID } from '@/components/MapPicker/MapPicker';
import { Model } from './Model';
import { MouseButtons } from './MouseButtons';
import { Sides } from './Sides';
import { UtilityMovement } from './UtilityMovement';
import { UtilityTypes } from './UtilityTypes';

export interface Utility extends Model {
  name: string;
  type: UtilityTypes;
  map: MapID;
  side: Sides;
  mouseButton: MouseButtons;
  crouch: boolean;
  movement: UtilityMovement;
  videoLink?: string;
  description?: string;
  createdBy: string;
  createdAt: Date;
  images: string[];
  shared: boolean;
}
