interface IStates {
  Brightness?: Brightness;
  ColdWarmColor?: ColdWarmColor;
  OnOff?: OnOff;
  HCL?: HCL;
}

// type Conditions = '=' | '!=' | '>' | '<' | '>=' | '<=';
type Conditions = 0 | 1 | 2 | 3 | 4 | 5;

interface Brightness {
  brightness?: number;
  condition?: Conditions;
}

interface ColdWarmColor {
  coldWarmColor?: number;
  condition?: Conditions;
}

interface HCL {
  active?: boolean;
  hclid?: string;
  mode?: number;
}

interface OnOff {
  on?: boolean;
}

interface All {
  name: 'ALL';
}

interface Any {
  name: 'ANY';
  trigger: Array<DeviceCondition | TimeCondition>;
}

export interface ISceneRule {
  metadata: {
    name: string;
    description: string;
  };
  conditions: {
    type: All | Any;
    data: Array<DeviceCondition | TimeCondition>;
  };
  actions: Array<Array<DeviceAction | TimeAction>>;
}

interface DeviceCondition {
  category: 'device';
  type: string;
  deviceId: string;
  states: IStates | Record<string, Record<string, boolean | number | string>>;
}

interface Time1 {
  category: 'time';
  type: 'time.before' | 'time.after';
  value: string;
}

interface Time2 {
  category: 'time';
  type: 'time.range';
  start: string;
  end?: string;
  duration?: string;
}

interface Time3 {
  category: 'time';
  type: 'time.set';
  time: 'sunrise' | 'sunset';
  offset: string;
}

interface Time4 {
  category: 'time';
  type: 'time.schedule';
  weekdays?: Number[];
  months?: Number[];
  days?: Number[];
}

type TimeCondition = Time1 | Time2 | Time3 | Time4;

interface Time5 {
  category: 'time-action';
  type: 'time.repeat';
  repeat: number;
  duration: string;
}

interface Time6 {
  category: 'time-action';
  type: 'time.delay';
  duration: string;
}

type TimeAction = Time5 | Time6;

interface DeviceAction extends DeviceCondition {}
