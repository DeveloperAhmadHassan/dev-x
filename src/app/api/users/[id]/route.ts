import {NextRequest, NextResponse} from "next/server";
import {cookies} from "next/headers";

export const GET = async (
    request: NextRequest,
    {params}: { params: Promise<{id: string }>
}) => {
    try {
        const id = (await params).id;
        if(!id) return new NextResponse(JSON.stringify({ message: "Id not found", status: 400 }), {status: 400});

        return new NextResponse(JSON.stringify({ message: `User with ${id} found`, status: 200 }), {status: 200});
    } catch (error) {
        return new NextResponse(JSON.stringify({ error: "Error Occurred", status: 500 }), {status: 500})
    }
}