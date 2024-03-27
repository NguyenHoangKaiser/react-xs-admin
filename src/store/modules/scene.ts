import { authApi } from '@/server/authApi';
import { EConditionsTypeName } from '@/utils/constant';
import type {
  ISceneAction,
  ISceneCondition,
  ISceneConditionType,
  ISceneRule,
  IStates,
} from '@/views/Settings/Scenes/scene';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { PURGE } from 'redux-persist';
interface SceneSlice {
  addScene: ISceneRule;
  addingScene: boolean;
}
const initialState: SceneSlice = {
  addingScene: false,
  addScene: {
    metadata: {
      name: '',
      description: '',
    },
    conditions: {
      type: { name: 1 },
      data: [],
    },
    actions: {
      data: [],
    },
  },
};

export const sceneSlice = createSlice({
  name: 'scene',
  initialState,
  reducers: {
    setAddingSceneState: (state, action: PayloadAction<boolean>) => {
      state.addingScene = action.payload;
    },
    setSceneMetadata: (state, action: PayloadAction<ISceneRule['metadata']>) => {
      state.addScene.metadata = {
        ...state.addScene.metadata,
        ...action.payload,
      };
    },
    setSceneConditions: (state, action: PayloadAction<ISceneRule['conditions']>) => {
      state.addScene.conditions = {
        ...state.addScene.conditions,
        ...action.payload,
      };
    },
    addSceneCondition: (state, action: PayloadAction<ISceneCondition>) => {
      state.addScene.conditions.data.push(action.payload);
      state.addingScene = true;
    },
    editSceneConditionData: (
      state,
      action: PayloadAction<{
        index: number;
        condition: ISceneCondition;
        trigger?: boolean;
      }>,
    ) => {
      const find = state.addScene.conditions.data.findIndex(
        (item) => item.created === action.payload.condition.created,
      );
      if (find !== -1 && find === action.payload.index) {
        state.addScene.conditions.data[find] = action.payload.condition;
        if (
          action.payload.trigger !== undefined &&
          state.addScene.conditions.type.name === EConditionsTypeName.Any
        ) {
          const find = state.addScene.conditions.type.trigger.findIndex(
            (item) => item.created === action.payload.condition.created,
          );
          if (find !== -1) {
            if (action.payload.trigger) {
              state.addScene.conditions.type.trigger[find] = action.payload.condition;
            } else {
              state.addScene.conditions.type.trigger.splice(find, 1);
            }
          } else {
            state.addScene.conditions.type.trigger.push(action.payload.condition);
          }
        }
      }
    },
    editSceneActionData: (
      state,
      action: PayloadAction<{
        index: number;
        condition: ISceneAction;
      }>,
    ) => {
      const find = state.addScene.actions.data.findIndex(
        (item) => item.created === action.payload.condition.created,
      );
      if (find !== -1 && find === action.payload.index) {
        state.addScene.actions.data[find] = action.payload.condition;
      }
    },
    addSceneConditionDataState: (
      state,
      action: PayloadAction<{
        index: number;
        state: IStates;
      }>,
    ) => {
      const oldData = state.addScene.conditions.data[action.payload.index];
      if (oldData && 'states' in oldData) {
        state.addScene.conditions.data[action.payload.index] = {
          ...oldData,
          states: {
            ...oldData.states,
            ...action.payload.state,
          },
        };
      }
    },
    editSceneConditionType: (state, action: PayloadAction<ISceneConditionType>) => {
      state.addScene.conditions.type = action.payload;
    },
    deleteSceneCondition: (
      state,
      action: PayloadAction<{
        index: number;
        created: number;
      }>,
    ) => {
      const find = state.addScene.conditions.data.findIndex(
        (item) => item.created === action.payload.created,
      );
      if (find !== -1 && find === action.payload.index) {
        state.addScene.conditions.data.splice(find, 1);
      }
      if (state.addScene.conditions.type.name === EConditionsTypeName.Any) {
        const find = state.addScene.conditions.type.trigger.findIndex(
          (item) => item.created === action.payload.created,
        );
        if (find !== -1) {
          state.addScene.conditions.type.trigger.splice(find, 1);
        }
      }
    },
    setSceneActions: (state, action: PayloadAction<ISceneRule['actions']>) => {
      state.addScene.actions = action.payload;
    },
    addSceneAction: (state, action: PayloadAction<ISceneAction>) => {
      state.addScene.actions.data.push(action.payload);
      state.addingScene = true;
    },
    deleteSceneAction: (
      state,
      action: PayloadAction<{
        index: number;
        created: number;
      }>,
    ) => {
      const find = state.addScene.actions.data.findIndex(
        (item) => item.created === action.payload.created,
      );
      if (find !== -1 && find === action.payload.index) {
        state.addScene.actions.data.splice(find, 1);
      }
    },
    setAddScene: (state, action: PayloadAction<ISceneRule>) => {
      state.addScene = action.payload;
    },
    finishAddScene: (state) => {
      state.addingScene = false;
      state.addScene = initialState.addScene;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(PURGE, () => {
      return initialState;
    });
    // builder.addCase(setStoreMultiTabs, (state, { payload }) => {
    //   if (payload.type === 'delete' && payload.tabs.key === RouteEnum.SettingsScenesAdd) {
    //     if (state.addingScene) {
    //       Modal.confirm({
    //         title: 'Are you sure you want to leave?',
    //         content: 'You have unsaved changes that will be lost.',
    //         onOk: () => {
    //           state.addScene = initialState.addScene;
    //           state.addingScene = false;
    //         },
    //         onCancel: () => {},
    //       });
    //     }
    //   }
    // });
    builder.addMatcher(authApi.endpoints.logout.matchFulfilled, (state, { payload }) => {
      if (payload) {
        state = initialState;
      }
    });
  },
});

export const {
  setAddingSceneState,
  setSceneMetadata,
  setSceneConditions,
  setSceneActions,
  setAddScene,
  addSceneAction,
  addSceneCondition,
  deleteSceneAction,
  deleteSceneCondition,
  editSceneConditionData,
  editSceneActionData,
  addSceneConditionDataState,
  editSceneConditionType,
  finishAddScene,
} = sceneSlice.actions;

export const sceneSelector = (state: { scene: SceneSlice }) => state.scene;
export const addSceneSelector = (state: { scene: SceneSlice }) => state.scene.addScene;
export const addSceneConditionsSelector = (state: { scene: SceneSlice }) =>
  state.scene.addScene.conditions;

export default sceneSlice.reducer;
