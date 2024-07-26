import { NextResponse } from 'next/server'
import fetch from 'node-fetch'

async function runWorkflow(body: any) {
    const url =
        "https://comfy.icu/api/v1/workflows/" + body.workflow_id + "/runs";
    const resp = await fetch(url, {
        headers: {
            accept: "application/json",
            "content-type": "application/json",
            authorization: "Bearer " + process.env.COMFY_ICU_API_KEY,
        },
        body: JSON.stringify(body),
        method: "POST",
    });

    return await resp.json();
}


async function getRunStatus(workflow_id: string, run_id: string) {
    const url =
        "https://comfy.icu/api/v1/workflows/" + workflow_id + "/runs/" + run_id;
    const resp = await fetch(url, {
        headers: {
            accept: "application/json",
            "content-type": "application/json",
            authorization: "Bearer " + process.env.COMFY_ICU_API_KEY,
        },
    });
    return await resp.json();
}


async function pollRunStatus(
    workflow_id: string,
    run_id: string,
    maxAttempts = 30,
    delay = 10000
) {
    for (let attempt = 0; attempt < maxAttempts; attempt++) {
        try {
            const status : any = await getRunStatus(workflow_id, run_id);
            console.log(`Attempt ${attempt + 1}: Run status is ${status.status}`);

            if (status.status === "COMPLETED" || status.status === "ERROR") {
                return status;
            }

            await new Promise((resolve) => setTimeout(resolve, delay));
        } catch (error: any) {
            console.error(`Error during polling: ${error.message}`);
            throw error;
        }
    }

    throw new Error("Max polling attempts reached");
}

export async function POST(req: Request) {
    try {
        const {workflow_id, prompt, files} = await req.json();
        console.log(`Workflow ID: ${workflow_id}`);
        console.log(`Prompt: ${prompt}`);
        console.log(`Files: ${files}`);

        const run = await runWorkflow({workflow_id, prompt, files});
        // return NextResponse.json(run);
        console.log(run);
        const finalStatus = await pollRunStatus(workflow_id, run.id);
        return NextResponse.json(finalStatus);
        // console.log(`Final status: ${JSON.stringify(finalStatus, null, 2)}`);
        // console.log(`Output: ${JSON.stringify(finalStatus.output, null, 2)}`);
    } catch (error: any) {
        if (error.message === "Max polling attempts reached") {
            console.log(`Polling timed out: ${error.message}`);
        } else {
            console.log(`An error occurred while polling: ${error.message}`);
        }
        return NextResponse.error();
    }

}