export const KEY_FIXED_POS = 'fixed-position';
export const KEY_RELATIVE_POS = 'relative-positoin'
export const KEY_ROTATION = 'fixed-rotation';
export const KEY_ORBIT_ROTATION = 'orbit-rotation';
export const KEY_SCALE = 'scale';
export const KEY_MIRROR = 'mirror';
export const KEY_VISIBLE = 'visible';
export const KEY_STATES = 'states';
export const KEY_TOKEN_ID = 'token-id';
export const KEY_LEVER_ID = 'lever-id';
export const KEY_TRAIT_TYPE = 'trait_type';
export const KEY_WIDTH = 'width';
export const KEY_HEIGHT = 'height';
export const KEY_ANCHOR = 'anchor';
export const KEY_COLOR = 'color';

export enum TrailType {
  Artist = 'Artist',
  LayerCount = 'Layer Count'
}

export interface Attribute {
  [KEY_TRAIT_TYPE]: string;
  value: string;
}

// Value index in contract
export interface ValueOnChain {
  // token id that hold the levers
  [KEY_TOKEN_ID]: number;
  // lever id to query the current value
  [KEY_LEVER_ID]: number;
}

// Integer property
export type IntProperty = ValueOnChain | number;

export enum Color {
  R = 'red',
  G = 'green',
  B = 'blue',
  ALPHA = 'alpha',
  HUE = 'hue',
  MULTIPLY = 'multiply',
  LIGHTEN = 'lighten',
  OPACITY = 'opacity',
  OVERLAY = 'overlay'
}

// Locate the image with 2d parameters
export interface PositionType {
  x: IntProperty;
  y: IntProperty;
}

export interface MirrorType {
  x: ValueOnChain | 0 | 1;
  y: ValueOnChain | 0 | 1;
}

// Full color model of a layer
export interface ColorType {
  [Color.R]?: IntProperty;
  [Color.G]?: IntProperty;
  [Color.B]?: IntProperty;
  [Color.ALPHA]?: IntProperty;
  [Color.HUE]?: IntProperty;
  [Color.MULTIPLY]?: IntProperty;
  [Color.LIGHTEN]?: IntProperty;
  [Color.OPACITY]?: IntProperty;
  [Color.OVERLAY]?: IntProperty;
}

// Main layer interface
export interface LayerOption {
  // layer uri
  uri?: string;
  // layer label
  label?: string;
  // anchor layer id
  [KEY_ANCHOR]?: string;
  // fixed position of layer
  [KEY_FIXED_POS]?: PositionType;
  // fixed rotation degree of layer
  [KEY_ROTATION]?: IntProperty;
  // mirror transition
  [KEY_MIRROR]?: MirrorType;
  // relative position of layer around the anchor layer
  [KEY_RELATIVE_POS]?: PositionType;
  // is layer visible
  [KEY_VISIBLE]?: IntProperty;
  // final center x of layer. Not pre-defined
  finalCenterX?: number;
  // final center y of layer. Not pre-defined
  finalCenterY?: number;
  // if layer is rendered complete, set true
  active?: boolean;
  // layer color scheme
  [KEY_COLOR]?: ColorType;
  // layer z-index (will be supported in the future)
  zIndex?: number;
}

export interface LayerStates {
  options: Array<LayerOption>;
  [KEY_TOKEN_ID]: number;
  [KEY_LEVER_ID]: number;
}

// Outer Layer with optional sub-layers.
export interface Layer extends LayerOption {
  id: string;
  [KEY_STATES]?: LayerStates
}

// Master config json
export interface MasterConfig {
  // name of artwork
  name: string;
  // description of artwork
  description: string;
  // image of artwork
  image: string;
  // attributes of artwork
  attributes?: Array<Attribute>;
  // layout of artwork with multiple layers
  layout?: {
    type: string;
    version: number;
    // multiple layers of artwork
    layers: Array<Layer>;
  }
}
