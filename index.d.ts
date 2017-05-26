

export declare var anime: AnimeStatic;



/** Query selector string. Same as jQuery. */
declare type  target = string | Element | NodeList | Object | any[];


declare interface AnimeStatic {

  (params?: AnimInput) : AnimInstance;

  version : string;


  /**
   * Change all animations speed (from 0 to 1).
   */
  speed : number;

  /**
   * Return an Array of all active Anime instances.
   */
  running : AnimInstance[];



  /**
   * Remove one or multiple targets from the animation.
   */
  remove(targets: target) : void;


  /**
   * Get current valid value from an element.
   */
  getValue(targets: target, propName: string) : string | number;


  /**
   *  Create a path Function for motion path animation.
   * Accepts either a DOM node or CSS selector.
   */
  path(path, percent?: number) : (prop: string)=> FunctionBasedValues;


  /**
   * An helper for line drawing animation.
   * Sets the 'stroke-dasharray' to the total path length and return its value.
   */
  setDashoffset(el: SVGPathElement) : number;


  /**
   * Return the complete list of built in easing functions
   */
  easings: Easings;


  /**
   * Return a custom Bézier curve easing function
   */
  bezier(x1: number, x2: number, y1: number, y2: number) : (x) => number;


  /**
   * Create a timeline to synchronise other Anime instances.
   */
  timeline(params? :AnimationParameters) : TimelineInstance ;


  /**
   * Generate a random number between two numbers.
   */
  random(min: number, max: number) : number;
}


interface AnimInput extends Targets, AnimatableProperties {
}

interface Targets{
  /**
   * The targets property defines the elements or JS Objects to animate.
   *   | Types         | Examples
   *   | ------------- | ---------------
   *   | CSS Selectors | `'div'`, `'.item'`, `'path'`
   *   | DOM Element   | `document.querySelector('.item')`
   *   | NodeList      | `document.querySelectorAll('.item')`
   *   | `Object`      | `{prop1: 100, prop2: 200}`
   *   | `Array`       | `['div', '.item', domNode]`
  */
  targets? : target;
}


/**
 * | Types | Examples
 * | --- | ---
 * | CSS | `opacity`, `backgroundColor`, `fontSize` ...
 * | Transforms | `translateX`, `rotate`, `scale` ...
 * | Object properties | Any `Object` property containing numerical values
 * | DOM attributes | Any DOM attributes containing numerical values
 * | SVG attributes | Any SVG attributes containing numerical values
 */
export interface AnimatableProperties {
  // Transformations
  translateX?: AnimatableProperty;
  translateY?: AnimatableProperty;
  rotate?: AnimatableProperty;
  scale?: AnimatableProperty;

  // CSS
  opacity?: AnimatableProperty;
  color?: AnimatableProperty;
  backgroundColor?: AnimatableProperty;
  left?: AnimatableProperty;
  top?: AnimatableProperty;
  border?: AnimatableProperty;

  // SVG
  points?: AnimatableProperty;
  strokeDashoffset?: AnimatableProperty;

  // DOM
  value?: AnimatableProperty;
  round?: number; // Remove decimals by rounding the value


  // Custom Props
  [prop: string]: any
}

/** Single value
 * Defines the end value of the animation.
 * Start value is the original target value, or default transforms value.
 */
declare type propertyValue = number | string;
declare type FunctionBasedValues = (el: Element, index?: number, targetsLength?: number) => propertyValue;
declare type FromToValues = [propertyValue | FunctionBasedValues, propertyValue | FunctionBasedValues];
declare type PropertyValues = propertyValue | FromToValues | FunctionBasedValues;


/**
 * Defines duration, delay and easing for each property animations.
 * Can be set globally, or individually to each properties:
 *
 *  | Names | Defaults | Types | Info
 *  | --- | --- | --- | ---
 *  | duration | `1000` | `number`, `function`  | millisecond
 *  | delay | `0` | `number`, `function`   | millisecond
 *  | easing | `'easeOutElastic'` | `function`  | [See Easing functions](#easing-functions)
 *  | elasticity | `500` | `number`, `function` | Range [0 - 1000]
 *  | round | `false` | `number`, `boolean`, `function` | Power of 10
 */
declare interface PropertyParameters {
  value: PropertyValues,
  duration: FunctionBasedValues | number,
  delay?: FunctionBasedValues | number,
  elasticity? : FunctionBasedValues | number,
  easing?: Easing | Function
  round? : number | boolean | Function
}

/**
 * Keyframes are defined using an Array of property Object.
 * Instance's duration is divided by the number of keyframes of each properties if not specified.
 */
export declare type Keyframes = PropertyParameters[];

export declare type AnimatableProperty = PropertyValues | PropertyParameters | Keyframes;


/**
 * Parameters relative to the animation to specify the direction, the number of loops or autoplay.
 */
export declare interface  AnimationParameters  {
    loop?: boolean | number;
    direction?: 'normal'|'reverse'|'alternate';
    autoplay?: boolean;
}






/**
 * Instance
 */
interface AnimInstance extends
  AnimationCallbacks, AnimationParameters, instanceParams {
    /** timeline children */
    children: AnimInstance[],
    animatables: FunctionBasedValues[],
    animations: any[], // ????

    reset();
    tick(t:number);
    seek(t:number);
    pause();
    play();
    reverse();
    restart();

    currentTime: number;
    progress: number;
    paused: boolean;
    began: boolean;
    completed: boolean;
    reversed: boolean;
    remaining: boolean;
}

interface instanceParams {
    offset: FunctionBasedValues;
    duration: FunctionBasedValues,
    delay: FunctionBasedValues,
}


declare type AnimationCallback = (AnimInstance)=>{} ;

interface AnimationCallbacks {
    update: AnimationCallback;
    begin: AnimationCallback;
    complete: AnimationCallback;
    run: AnimationCallback;
}


interface TimelineInstance extends AnimInstance {
  add(params: AnimInput);
}


interface Easings {
        easeInElastic(a: any, b: any): any;
        easeInOutElastic(b: any, c: any): any;
        easeOutElastic(b: any, c: any): any;
        easeInBack(h: any): any;
        easeInCirc(h: any): any;
        easeInCubic(h: any): any;
        easeInExpo(h: any): any;
        easeInOutBack(h: any): any;
        easeInOutCirc(h: any): any;
        easeInOutCubic(h: any): any;
        easeInOutExpo(h: any): any
        easeInOutQuad(h: any): any;
        easeInOutQuart(h: any): any;
        easeInOutQuint(h: any): any;
        easeInOutSine(h: any): any;
        easeInQuad(h: any): any;
        easeInQuart(h: any): any;
        easeInQuint(h: any): any;
        easeInSine(h: any): any;
        easeOutBack(h: any): any;
        easeOutCirc(h: any): any;
        easeOutCubic(h: any): any;
        easeOutExpo(h: any): any;
        easeOutQuad(h: any): any;
        easeOutQuart(h: any): any;
        easeOutQuint(h: any): any;
        easeOutSine(h: any): any;
    }

declare type Easing =
  'easeInSine' |
  'easeOutSine' |
  'easeInOutSine' |
  'easeInCirc' |
  'easeOutCirc' |
  'easeInOutCirc' |
  'easeInElastic' |
  'easeOutElastic' |
  'easeInOutElastic' |
  'easeInBack' |
  'easeOutBack' |
  'easeInOutBack' |
  'easeInBounce' |
  'easeOutBounce' |
  'easeInOutBounce' |
  'easeInQuad' |
  'easeOutQuad' |
  'easeInOutQuad' |
  'easeInCubic' |
  'easeOutCubic' |
  'easeInOutCubic' |
  'easeInQuart' |
  'easeOutQuart' |
  'easeInOutQuart' |
  'easeInQuint' |
  'easeOutQuint' |
  'easeInOutQuint' |
  'easeInExpo' |
  'easeOutExpo' |
  'easeInOutExpo' |
  'linear' |
  [number, number, number, number];
