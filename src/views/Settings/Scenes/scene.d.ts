import {
  EConditionsTypeName,
  ESceneOperator,
  EStatus,
  ETimeType,
  TIconType,
} from '@/utils/constant';

interface IStates {
  Brightness?: Brightness;
  ColdWarmColor?: ColdWarmColor;
  OnOff?: OnOff;
  HCL?: HCL;
}

export type ILightTrait = keyof IStates;

interface Brightness {
  brightness: number;
  operator: ESceneOperator;
}

interface ColdWarmColor {
  coldWarmColor: number;
  operator: ESceneOperator;
}

interface HCL {
  active?: boolean;
  hclid?: string;
  mode?: number;
}

interface OnOff {
  on: boolean;
  operator: 1;
}

interface AllOrAny {
  name: EConditionsTypeName.All | EConditionsTypeName.Any;
  trigger: Array<ISceneCondition>;
}

interface All extends AllOrAny {
  name: EConditionsTypeName.All;
}

interface Any extends AllOrAny {
  name: EConditionsTypeName.Any;
  trigger: Array<ISceneCondition>;
}

export type ISceneConditionType = All | Any;

export type ISceneCondition = ISceneDeviceCondition | ISceneTimeCondition;
export type ISceneAction = ISceneDeviceAction | ISceneTimeAction;
export interface ISceneRule {
  metadata: {
    name: string;
    description: string;
    icon?: TIconType;
    created?: number;
    savedAt?: number;
    status?: EStatus;
  };
  conditions: {
    type: ISceneConditionType;
    data: Array<ISceneCondition>;
  };
  actions: {
    data: Array<ISceneAction>;
  };
}

interface ISceneDevice {
  editing?: boolean;
  created: number;
  category: 'device' | 'device-action';
  type: TDeviceType;
  deviceId: string | null;
  states: IStates | null;
}

export interface ISceneDeviceCondition extends ISceneDevice {
  editing?: boolean;
  created: number;
  category: 'device';
  type?: string | null | TDeviceType;
  deviceId: string | null;
  states: IStates | null;
  // states: IStates | Record<string, Record<string, boolean | number | string>> | null;
}

interface Time {
  editing?: boolean;
  created: number;
  category: 'time' | 'time-action';
  type: ETimeType | null;
  operator?: ESceneOperator | null;
  value?: number;
  startDate?: number;
  endDate?: number;
  startTime?: string;
  endTime?: string;
  duration?: number;
}

interface TimeExact extends Time {
  category: 'time';
  type: ETimeType.TimeExact;
  operator: ESceneOperator;
  value: number;
}

interface DateRange extends Time {
  category: 'time';
  type: ETimeType.DateRange;
  startDate: number;
  endDate: number;
}

interface TimeRange extends Time {
  category: 'time';
  type: ETimeType.TimeRange;
  startTime: string;
  endTime: string;
}

interface Time3 extends Time {
  category: 'time';
  type: ETimeType.TimeSet;
  time: 'sunrise' | 'sunset';
  offset: string;
}

interface Time4 extends Time {
  category: 'time';
  type: ETimeType.TimeSchedule;
  weekdays?: Number[];
  months?: Number[];
  days?: Number[];
}

interface Time5 extends Time {
  category: 'time';
  type: ETimeType.TimeOnce;
  value: number;
}

export type ISceneTimeCondition = Time | TimeExact | DateRange | Time3 | Time4 | Time5;

interface Time15 extends Time {
  category: 'time-action';
  type: ETimeType.TimeRepeat;
  repeat: number;
  duration: number;
}

interface TimeDelay extends Time {
  category: 'time-action';
  type: ETimeType.TimeDelay;
  duration: number;
}

export type ISceneTimeAction = Time | Time15 | TimeDelay;

export interface ISceneDeviceAction extends ISceneDevice {
  editing?: boolean;
  created: number;
  category: 'device-action';
  type: TDeviceType;
  deviceId: string | null;
  states: IStates | null;
}
