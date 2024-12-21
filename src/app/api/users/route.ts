import {NextRequest, NextResponse} from "next/server";
import {cookies} from "next/headers";

export const GET = async () => {
    const cookieStore = await cookies();
    const a = cookieStore.set("NEXT COOKIE", "VALUE OF NEXT COOKIE")
    console.log(a);
    return new NextResponse(JSON.stringify({ message: "Hello World", status: 200 }), {status: 200, headers: {
        "Content-Type": "application/json",
    }});
}

export const POST = async (request: NextRequest) => {
    try {
        const {name, email} = await request.json();
        if(!name || !email) return new Response(JSON.stringify({ error: `Details not found`, status: 400 }), {status: 400});
        console.log({name, email});

        const cookieStore = await cookies();
        const a = cookieStore.get("NEXT COOKIE");
        console.log(a);

        return new NextResponse(JSON.stringify({ message: "Object Created!", status: 201 }), {status: 201});
    } catch (error: any) {
        return new NextResponse(JSON.stringify({ error: `Error Occurred: ${error.message}`, status: 500 }), {status: 500});
    }
}