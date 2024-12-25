const PlayHT = require('playht');
const path = require('path');  // Correct import
const translate = require('@vitalets/google-translate-api');
const fs = require('fs');
const res = require("express/lib/response");      // Correct import


const generateAudio = async (req, res)=> {
    try {
        // Initialize PlayHT API
        PlayHT.init({
            userId: process.env.PLAYHT_USER_ID,
            apiKey: process.env.PLAYHT_API_KEY,
        });

        const text = "All human wisdom is summed up in these two words: Wait and hope. After making these changes, restart both the backend and frontend servers and test again. If the error persists, inspect the network requests in your browser’s developer tools to identify the exact issue.";
        const translatedText = await translate(text, { from: 'en', to: 'bn' });
        // const stream = await PlayHT.stream(text, { voiceEngine: "PlayDialog" });
        const stream = await PlayHT.stream(translatedText.text, {
            voiceEngine: "PlayDialog",
            voice: "Bangla", // Replace with the actual Bangla voice name
        });

        // Define the output file path
        const filePath = path.join(process.cwd(), "public", "output.mp3");

        // Create a write stream to save the audio file
        const writeStream = fs.createWriteStream(filePath);
        stream.pipe(writeStream);

        // Return the response when the stream finishes
        // return new Promise((resolve, reject) => {
            stream.on("end", () => {
                console.log('complete')
                return res.status(200).send({file:  "/output.mp3"});
                // resolve(
                //     new Response(
                //         JSON.stringify({ message: "Audio file created", file: "/output.mp3" }),
                //         { status: 200 }
                //     )
                // );
            });

            stream.on("error", (err) => {
                console.error("Stream error:", err);
                reject(new Response(JSON.stringify({ error: "Failed to process stream" }), { status: 500 }));
            });
        // });

    } catch (error) {
        console.error("Error:", error);
        return new Response(JSON.stringify({ error: "Something went wrong" }), { status: 500 });
    }
}

module.exports = {generateAudio};
