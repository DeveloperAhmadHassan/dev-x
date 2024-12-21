import {NextRequest, NextResponse} from "next/server";
import {cookies} from "next/headers";

export const GET = async (
    request: NextRequest,
    {params}: { params: Promise<{id: string, name: string }>
}) => {
    try {
        const id = (await params).id;
        const name = (await params).name;
        if(!Number.parseInt(id)) return new NextResponse(JSON.stringify({ message: "Invalid Id", status: 400 }), {status: 400});
        if(!id || !name) return new NextResponse(JSON.stringify({ message: "Details not found", status: 400 }), {status: 400});

        return new NextResponse(JSON.stringify({ message: `User with id: ${id} and name: ${name} found`, status: 200 }), {status: 200});
    } catch (error) {
        return new NextResponse(JSON.stringify({ error: "Error Occurred", status: 500 }), {status: 500})
    }
}