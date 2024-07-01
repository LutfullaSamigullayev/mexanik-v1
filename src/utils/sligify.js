export function slugify(text) {
    return text.trim().toLowerCase().replaceAll(" ", "-");
}