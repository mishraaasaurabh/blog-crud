import slugify from 'slugify';

export default function customSlugify(title: string): string {
    return slugify(title, { lower: true, strict: true });
}
