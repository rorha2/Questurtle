// =====================
// 한글 조사
// =====================

function hasBatchim(word){

    const lastChar =
    String(word).slice(-1);

    const charCode =
    lastChar.charCodeAt(0);

    if(
        charCode < 0xAC00 ||
        charCode > 0xD7A3
    ){
        return false;
    }

    return (
        (charCode - 0xAC00) % 28 !== 0
    );

}

function addJosa(word, type){

    const text =
    String(word);

    const batchim =
    hasBatchim(text);

    const particles = {

        "이/가":
        batchim ? "이" : "가",

        "은/는":
        batchim ? "은" : "는",

        "을/를":
        batchim ? "을" : "를",

        "과/와":
        batchim ? "과" : "와",

        "이에요/예요":
        batchim ? "이에요" : "예요"

    };

    return (
        text +
        (particles[type] || "")
    );

}

function formatCharacterName(name){

    const text =
    String(name).trim();

    if(
        text.endsWith("이") ||
        !hasBatchim(text)
    ){
        return text;
    }

    return text + "이";

}