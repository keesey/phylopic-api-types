import BINARY_IMAGES from './BINARY_IMAGES';
import TEXT_IMAGES from './TEXT_IMAGES';
export const IMAGES: ReadonlySet<string> = new Set<string>([...BINARY_IMAGES, ...TEXT_IMAGES]);
export default IMAGES;
