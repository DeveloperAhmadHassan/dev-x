'use client'

import React from 'react';
import {ConvexReactClient} from "convex/react";
import {ClerkProvider, useAuth} from "@clerk/nextjs";
import {ConvexProviderWithClerk} from "convex/react-clerk";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

function ConvexClientProvider({children}: {children: React.ReactNode}): React.ReactElement {
    return (
        // @ts-ignore
        <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY!}>
            <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
                {children}
            </ConvexProviderWithClerk>
        </ClerkProvider>
    );
}

export default ConvexClientProvider;