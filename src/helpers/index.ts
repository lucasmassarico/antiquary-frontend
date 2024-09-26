import { staticFilesServer } from "@/lib/axios";

export const getImageUrl = (imageName: string) => {
    const url_path = `${staticFilesServer}${imageName}`;
    return url_path;
};

export const toTitleCase = (str: string) => {
    const exceptions = [
        "e",
        "com",
        "de",
        "da",
        "do",
        "das",
        "dos",
        "a",
        "o",
        "em",
    ];

    return str
        .toLowerCase()
        .split(" ")
        .map((word, index) => {
            if (index === 0 || !exceptions.includes(word)) {
                return word.charAt(0).toUpperCase() + word.slice(1);
            }
            return word;
        })
        .join(" ");
};
