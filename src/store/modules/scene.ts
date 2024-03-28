import { authApi } from '@/server/authApi';
import { EConditionsTypeName, EStatus } from '@/utils/constant';
import type {
  ISceneAction,
  ISceneCondition,
  ISceneConditionType,
  ISceneRule,
} from '@/views/Settings/Scenes/scene';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import dayjs from 'dayjs';
import { PURGE } from 'redux-persist';
interface SceneSlice {
  addScene: ISceneRule;
  editScene: ISceneRule;
  addingScene: boolean;
  editingScene: boolean;
  listScene: {
    data: ISceneRule[];
    loading: boolean;
  };
}
const initialState: SceneSlice = {
  addingScene: false,
  editingScene: false,
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
  editScene: {
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
  listScene: {
    data: [],
    loading: false,
  },
};

export const sceneSlice = createSlice({
  name: 'scene',
  initialState,
  reducers: {
    setEditScene: (state, action: PayloadAction<ISceneRule>) => {
      state.editingScene = true;
      state.editScene = action.payload;
    },
    setSceneMetadata: (
      state,
      action: PayloadAction<{
        data: ISceneRule['metadata'];
        for: 'add' | 'edit';
      }>,
    ) => {
      const name = action.payload.for === 'add' ? 'addScene' : 'editScene';
      state[name].metadata = {
        ...state[name].metadata,
        ...action.payload.data,
      };
      if (name === 'addScene') {
        state.addingScene = true;
      } else {
        state.editingScene = true;
      }
    },
    addSceneCondition: (
      state,
      action: PayloadAction<{
        data: ISceneCondition;
        for: 'add' | 'edit';
      }>,
    ) => {
      const name = action.payload.for === 'add' ? 'addScene' : 'editScene';
      state[name].conditions.data.push(action.payload.data);
      if (name === 'addScene') {
        state.addingScene = true;
      } else {
        state.editingScene = true;
      }
    },
    editSceneConditionData: (
      state,
      action: PayloadAction<{
        index: number;
        condition: ISceneCondition;
        trigger?: boolean;
        for: 'add' | 'edit';
      }>,
    ) => {
      const name = action.payload.for === 'add' ? 'addScene' : 'editScene';
      const find = state[name].conditions.data.findIndex(
        (item) => item.created === action.payload.condition.created,
      );
      if (find !== -1 && find === action.payload.index) {
        state[name].conditions.data[find] = action.payload.condition;
        if (
          action.payload.trigger !== undefined &&
          state[name].conditions.type.name === EConditionsTypeName.Any
        ) {
          const find = state[name].conditions.type.trigger.findIndex(
            (item) => item.created === action.payload.condition.created,
          );
          if (find !== -1) {
            if (action.payload.trigger) {
              state[name].conditions.type.trigger[find] = action.payload.condition;
            } else {
              state[name].conditions.type.trigger.splice(find, 1);
            }
          } else {
            state[name].conditions.type.trigger.push(action.payload.condition);
          }
        }
      }
    },
    editSceneActionData: (
      state,
      action: PayloadAction<{
        index: number;
        condition: ISceneAction;
        for: 'add' | 'edit';
      }>,
    ) => {
      const name = action.payload.for === 'add' ? 'addScene' : 'editScene';
      const find = state[name].actions.data.findIndex(
        (item) => item.created === action.payload.condition.created,
      );
      if (find !== -1 && find === action.payload.index) {
        state[name].actions.data[find] = action.payload.condition;
      }
    },
    editSceneConditionType: (
      state,
      action: PayloadAction<{
        data: ISceneConditionType;
        for: 'add' | 'edit';
      }>,
    ) => {
      const name = action.payload.for === 'add' ? 'addScene' : 'editScene';
      state[name].conditions.type = action.payload.data;
    },
    deleteSceneCondition: (
      state,
      action: PayloadAction<{
        index: number;
        created: number;
        for: 'add' | 'edit';
      }>,
    ) => {
      const name = action.payload.for === 'add' ? 'addScene' : 'editScene';
      const find = state[name].conditions.data.findIndex(
        (item) => item.created === action.payload.created,
      );
      if (find !== -1 && find === action.payload.index) {
        state[name].conditions.data.splice(find, 1);
      }
      if (state[name].conditions.type.name === EConditionsTypeName.Any) {
        const find = state[name].conditions.type.trigger.findIndex(
          (item) => item.created === action.payload.created,
        );
        if (find !== -1) {
          state[name].conditions.type.trigger.splice(find, 1);
        }
      }
    },
    addSceneAction: (
      state,
      action: PayloadAction<{
        data: ISceneAction;
        for: 'add' | 'edit';
      }>,
    ) => {
      const name = action.payload.for === 'add' ? 'addScene' : 'editScene';
      state[name].actions.data.push(action.payload.data);
      if (name === 'addScene') {
        state.addingScene = true;
      } else {
        state.editingScene = true;
      }
    },
    deleteSceneAction: (
      state,
      action: PayloadAction<{
        index: number;
        created: number;
        for: 'add' | 'edit';
      }>,
    ) => {
      const name = action.payload.for === 'add' ? 'addScene' : 'editScene';
      const find = state[name].actions.data.findIndex(
        (item) => item.created === action.payload.created,
      );
      if (find !== -1 && find === action.payload.index) {
        state[name].actions.data.splice(find, 1);
      }
    },
    finishAddScene: (state) => {
      const { metadata } = state.addScene;
      state.listScene.data.push({
        ...state.addScene,
        metadata: { ...metadata, savedAt: dayjs().unix(), status: EStatus.Active },
      });
      state.addingScene = false;
      state.addScene = initialState.addScene;
    },
    finishEditScene: (state) => {
      const { metadata } = state.editScene;
      const find = state.listScene.data.findIndex(
        (item) => item.metadata.savedAt === metadata.savedAt,
      );
      if (find !== -1) {
        state.listScene.data[find] = {
          ...state.editScene,
          metadata: { ...metadata, savedAt: dayjs().unix(), status: EStatus.Active },
        };
      }
      state.editingScene = false;
      state.editScene = initialState.editScene;
    },
    resetAddScene: (state) => {
      state.addScene = initialState.addScene;
      state.addingScene = false;
    },
    resetEditScene: (state) => {
      state.editScene = initialState.editScene;
      state.editingScene = false;
    },
    deleteScene: (
      state,
      action: PayloadAction<{
        created: number;
      }>,
    ) => {
      const find = state.listScene.data.findIndex(
        (item) => item.metadata.created === action.payload.created,
      );
      if (find !== -1) {
        state.listScene.data.splice(find, 1);
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(PURGE, () => {
      return initialState;
    });
    builder.addMatcher(authApi.endpoints.logout.matchFulfilled, (_state, { payload }) => {
      if (payload) {
        return initialState;
      }
    });
  },
});

export const {
  setEditScene,
  setSceneMetadata,
  addSceneAction,
  addSceneCondition,
  deleteSceneAction,
  deleteSceneCondition,
  editSceneConditionData,
  editSceneActionData,
  editSceneConditionType,
  finishAddScene,
  finishEditScene,
  resetAddScene,
  resetEditScene,
  deleteScene,
} = sceneSlice.actions;

export const sceneSelector = (state: { scene: SceneSlice }) => state.scene;
export const addSceneSelector = (state: { scene: SceneSlice }) => state.scene.addScene;
export const editSceneSelector = (state: { scene: SceneSlice }) => state.scene.editScene;
export const addSceneConditionsSelector = (state: { scene: SceneSlice }) =>
  state.scene.addScene.conditions;
export const editSceneConditionsSelector = (state: { scene: SceneSlice }) =>
  state.scene.editScene.conditions;
export const listSceneSelector = (state: { scene: SceneSlice }) => state.scene.listScene;

export default sceneSlice.reducer;
