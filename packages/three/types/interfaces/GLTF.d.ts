import { AnimationClip, Group, Camera } from 'three';

export interface GLTF {
  scene: Group;
  scenes: Group[];
  animations: AnimationClip[];
  cameras: Camera[];
  asset: object;
}
