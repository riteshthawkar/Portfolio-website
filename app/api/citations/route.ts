import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const title = searchParams.get('title');

    if (!title) {
        return NextResponse.json({ error: 'Title is required' }, { status: 400 });
    }

    try {
        const query = encodeURIComponent(title);

        // Fetch from Semantic Scholar with Next.js caching (revalidate once a day)
        const res = await fetch(`https://api.semanticscholar.org/graph/v1/paper/search?query=${query}&limit=1&fields=citationCount`, {
            next: { revalidate: 86400 } // Cache for 24 hours
        });

        if (!res.ok) {
            // If Semantic Scholar is rate limiting, return 0 gracefully instead of throwing
            // The Next.js cache will store this until revalidated, but better than breaking the UI
            return NextResponse.json({ citationCount: 0 });
        }

        const data = await res.json();
        let citationCount = 0;

        if (data.data && data.data.length > 0 && typeof data.data[0].citationCount === 'number') {
            citationCount = data.data[0].citationCount;
        }

        return NextResponse.json({ citationCount });

    } catch (error) {
        console.error("Error fetching citations API:", error);
        return NextResponse.json({ citationCount: 0 });
    }
}
