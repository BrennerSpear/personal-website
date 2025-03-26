import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

// This would typically come from a CMS or database
const articles = [
  {
    slug: "the-metaverse-is-coming",
    title: "The Metaverse is coming",
    date: "February 2021",
    publication: "Into the Metaverse",
    content: `
      <p>The concept of the metaverse has been around for decades, first appearing in Neal Stephenson's 1992 science fiction novel "Snow Crash." In the book, the metaverse is a virtual reality space where users interact with each other and software agents in a three-dimensional space that uses the metaphor of the real world.</p>
      
      <p>Fast forward to today, and the metaverse is no longer just a science fiction concept. It's becoming a reality, with companies like Facebook (now Meta), Microsoft, Epic Games, and others investing billions of dollars to build their versions of the metaverse.</p>
      
      <p>But what exactly is the metaverse? In simple terms, it's a collective virtual shared space, created by the convergence of virtually enhanced physical reality and physically persistent virtual reality. It's a space where users can interact with a computer-generated environment and other users.</p>
      
      <p>The metaverse is not just about virtual reality. It's about creating a new layer of reality that blends the physical and digital worlds. It's about creating a space where people can work, play, socialize, and create in ways that are not possible in the physical world.</p>
      
      <p>The potential applications of the metaverse are vast. From virtual offices and classrooms to digital concerts and sports events, the metaverse could revolutionize how we interact with the world and each other.</p>
      
      <p>However, the metaverse also raises important questions about privacy, security, and digital rights. As we spend more time in virtual spaces, who owns our digital identities and the content we create? How do we ensure that the metaverse is a safe and inclusive space for all users?</p>
      
      <p>These are questions that we need to address as the metaverse continues to evolve. But one thing is clear: the metaverse is coming, and it's going to change the way we live, work, and interact with each other.</p>
    `,
  },
  {
    slug: "nfts-and-lord-joseph-duveen",
    title: "NFTs and Lord Joseph Duveen",
    date: "March 2021",
    publication: "Into the Metaverse",
    content: `
      <p>In the early 20th century, Lord Joseph Duveen was the most influential art dealer of his time. He made his fortune by recognizing a simple economic truth: Europe had the art, but America had the money. Duveen became the middleman, buying art from cash-strapped European aristocrats and selling it to newly wealthy American industrialists.</p>
      
      <p>Today, we're seeing a similar dynamic play out in the world of digital art and NFTs (Non-Fungible Tokens). Just as Duveen recognized the potential of connecting European art with American wealth, today's NFT platforms are connecting digital creators with crypto wealth.</p>
      
      <p>NFTs, or Non-Fungible Tokens, are unique digital assets that represent ownership of a specific item, such as a piece of digital art, a tweet, or a virtual real estate. Unlike cryptocurrencies like Bitcoin or Ethereum, which are fungible (one Bitcoin is the same as another), NFTs are unique and cannot be exchanged on a one-to-one basis.</p>
      
      <p>The rise of NFTs has created a new market for digital art and collectibles. Artists who previously struggled to monetize their digital creations can now sell them as unique, verifiable assets. Collectors can own a piece of digital history, with the blockchain providing proof of authenticity and ownership.</p>
      
      <p>But just as Duveen's art market had its critics, the NFT market has its skeptics. Some question the value of owning a digital asset that can be easily copied. Others worry about the environmental impact of the blockchain technology that powers NFTs.</p>
      
      <p>Despite these concerns, the NFT market continues to grow. In March 2021, digital artist Beeple sold an NFT of his work for $69 million at Christie's, making it the third most expensive artwork by a living artist ever sold at auction.</p>
      
      <p>Just as Duveen transformed the art market of his time, NFTs are transforming the digital art market of our time. And just as Duveen's market eventually became a respected part of the art world, it's likely that NFTs will become a respected part of the digital world.</p>
    `,
  },
  {
    slug: "boomer-washing-memecoins",
    title: "Boomer-washing Memecoins: Relevance Investing",
    date: "April 2024",
    publication: "Into the Metaverse",
    content: `
      <p>In the ever-evolving landscape of cryptocurrency, a curious phenomenon has emerged: the "boomer-washing" of memecoins. This term describes the process by which seemingly frivolous digital assets, often created as jokes or memes, are repackaged and presented in ways that appeal to older, more traditional investors – the "boomers" of the financial world.</p>
      
      <p>Memecoins like Dogecoin, Shiba Inu, and more recently, Pepe, began as internet jokes but have since gained significant market capitalizations. The transformation of these assets from internet memes to "legitimate" investment opportunities represents a fascinating case study in what I call "relevance investing."</p>
      
      <p>Relevance investing is not about fundamental value or technical analysis. It's about investing in cultural relevance – betting on the continued popularity and cultural significance of a particular trend, meme, or phenomenon. In the case of memecoins, investors are essentially betting on the continued relevance of the meme that inspired the coin.</p>
      
      <p>The boomer-washing of memecoins involves presenting these assets in terms that traditional investors can understand and accept. This might involve creating white papers, developing "use cases," or establishing foundations – all trappings of legitimacy that help mask the fundamentally speculative nature of these investments.</p>
      
      <p>This process is facilitated by a growing number of financial influencers and crypto evangelists who serve as translators between the worlds of internet culture and traditional finance. They explain memes to boomers and investment principles to zoomers, creating a bridge that allows capital to flow from traditional finance into the wild west of crypto.</p>
      
      <p>The result is a strange hybrid: assets that derive their value from internet culture but are traded and discussed in the language of traditional finance. It's as if the joke and the serious investment exist in superposition, with different audiences seeing what they want to see.</p>
      
      <p>As this trend continues, we may see more examples of internet culture being repackaged for traditional investors. The question is whether these investors will learn to understand the true nature of what they're buying, or whether they'll continue to view these assets through the lens of traditional finance, potentially missing both the joke and the real dynamics at play.</p>
    `,
  },
  {
    slug: "cryptocurrency",
    title: "[crypto]currency",
    date: "May 2024",
    publication: "Into the Metaverse",
    content: `
      <p>The term "cryptocurrency" has always been somewhat of a misnomer. The "crypto" part is accurate – these digital assets do indeed rely on cryptography for security. But the "currency" part? That's where things get complicated.</p>
      
      <p>Traditional currencies serve three primary functions: they act as a medium of exchange, a unit of account, and a store of value. By these standards, most cryptocurrencies fall short. They're too volatile to be reliable stores of value, too complex to be convenient mediums of exchange, and too unstable to serve as units of account.</p>
      
      <p>So if cryptocurrencies aren't really currencies, what are they? The answer depends on which cryptocurrency we're talking about.</p>
      
      <p>Bitcoin, the original cryptocurrency, has evolved into something more akin to digital gold – a scarce, durable asset that people hold as a hedge against inflation and economic uncertainty. It's less a currency and more a speculative store of value.</p>
      
      <p>Ethereum and similar platforms are less about currency and more about creating a new kind of computational infrastructure – a global, decentralized computer that can run applications and store data without relying on centralized servers.</p>
      
      <p>Stablecoins like USDC and Tether are perhaps the closest to traditional currencies, as they're designed to maintain a stable value relative to a fiat currency like the US dollar. But even these are more like digital representations of existing currencies than new currencies in their own right.</p>
      
      <p>And then there are the memecoins – Dogecoin, Shiba Inu, and countless others – which function more like digital collectibles or speculative assets than currencies.</p>
      
      <p>Perhaps it's time to rethink our terminology. Instead of "cryptocurrencies," we might more accurately describe these as "cryptoassets" or "digital assets." This would better reflect their diverse nature and functions.</p>
      
      <p>Or perhaps we need to expand our understanding of what a currency can be. In a digital world, maybe the line between currencies, assets, and platforms is blurrier than we thought.</p>
      
      <p>Either way, one thing is clear: the [crypto] in cryptocurrency is no longer just about cryptography. It's also about the cryptic, evolving nature of these digital assets and the roles they play in our financial system.</p>
    `,
  },
  {
    slug: "the-endgame-is-within-view",
    title: "The Endgame is within View",
    date: "January 2025",
    publication: "Into the Metaverse",
    content: `
      <p>As we enter 2025, the contours of the crypto endgame are becoming increasingly clear. After years of volatility, experimentation, and regulatory uncertainty, the crypto ecosystem is beginning to stabilize and mature. The wild west days are giving way to a more structured, regulated, and integrated crypto landscape.</p>
      
      <p>The first sign of this maturation is the increasing regulatory clarity. Major jurisdictions around the world have now established clear regulatory frameworks for cryptocurrencies and digital assets. While these frameworks vary in their details, they share a common recognition of crypto as a legitimate, if novel, asset class that requires specific regulatory approaches.</p>
      
      <p>The second sign is the integration of crypto into the traditional financial system. Major banks now offer crypto custody services, investment products, and trading platforms. Payment processors support crypto transactions. Even central banks are exploring or implementing digital currencies inspired by crypto technology.</p>
      
      <p>The third sign is the consolidation of the crypto market itself. After the proliferation of thousands of cryptocurrencies and tokens, the market is now dominated by a smaller number of established players with clear use cases and value propositions. Bitcoin as digital gold, Ethereum as a computational platform, stablecoins as payment rails, and a handful of others serving specific niches.</p>
      
      <p>The fourth sign is the maturation of the technology itself. Scalability solutions, interoperability protocols, and user-friendly interfaces have made crypto more accessible and useful for everyday purposes. The technical barriers that once limited crypto adoption are gradually being overcome.</p>
      
      <p>This doesn't mean that crypto has become boring or that innovation has ceased. On the contrary, the establishment of a stable foundation has enabled more focused and practical innovation. Rather than creating entirely new systems, developers are now improving and extending the existing ones, making them more efficient, secure, and user-friendly.</p>
      
      <p>The crypto endgame, then, is not a revolution that overthrows the existing financial system. It's an evolution that transforms that system from within, making it more open, efficient, and accessible. The boundaries between "crypto" and "traditional finance" are blurring, not because crypto has been co-opted, but because it has succeeded in its mission to change how we think about and interact with money and value.</p>
      
      <p>The endgame is within view, and it looks less like a brave new world and more like a significantly upgraded version of the world we already know.</p>
    `,
  },
  {
    slug: "avanthropology-an-intro",
    title: "Avanthropology, an intro",
    date: "October 3, 2023",
    publication: "Avanathropology",
    content: `
      <p>Welcome to Avanthropology, a new publication dedicated to exploring the cutting edge of human culture, technology, and society. The name is a portmanteau of "avant-garde" and "anthropology" – reflecting our focus on emerging cultural phenomena and the human experiences that shape and are shaped by them.</p>
      
      <p>In this publication, we'll be examining the frontiers of human experience – the places where technology, art, economics, and social structures are evolving most rapidly. We'll be looking at these developments not just as abstract trends or technologies, but as lived human experiences that are changing how we relate to each other and to the world.</p>
      
      <p>Why "Avanthropology"? Because we believe that to understand the future, we need to combine the forward-looking perspective of the avant-garde with the human-centered approach of anthropology. We need to look not just at what's new and cutting-edge, but at how these innovations are being integrated into human lives and communities.</p>
      
      <p>This publication is for the curious, the forward-thinking, and the critically minded. It's for those who want to understand not just what's happening at the frontiers of human experience, but why it matters and what it means for our collective future.</p>
      
      <p>In the coming weeks and months, we'll be exploring topics ranging from the social dynamics of digital communities to the philosophical implications of artificial intelligence, from the economics of attention to the politics of technological change. We'll be talking to the people who are creating the future and those who are living in it, seeking to understand the human stories behind the headlines.</p>
      
      <p>We invite you to join us on this journey of exploration and discovery. Together, we'll be mapping the frontiers of human experience and trying to make sense of the rapidly evolving world we all share.</p>
      
      <p>Welcome to Avanthropology. The future is already here – let's try to understand it.</p>
    `,
  },
  {
    slug: "the-only-way-out-is-through",
    title: "The Only Way Out is Through",
    date: "October 4, 2023",
    publication: "Avanathropology",
    content: `
      <p>In an age of accelerating technological change and social transformation, it's tempting to look for escape routes – ways to opt out of the complexity and uncertainty of contemporary life. Some seek refuge in nostalgia, yearning for a simpler past that never really existed. Others retreat into digital bubbles, surrounding themselves with like-minded voices that reinforce their existing beliefs. Still others pin their hopes on technological utopias, imagining that the right innovation will solve all our problems.</p>
      
      <p>But these escape routes are illusions. The past cannot be recreated, digital bubbles eventually burst, and technological solutions create new problems even as they solve old ones. The truth is that there is no way out of the complexity and uncertainty of our time. The only way forward is through.</p>
      
      <p>Going through means engaging with the world as it is, not as we wish it to be. It means acknowledging the complexity of our challenges without being paralyzed by it. It means embracing uncertainty as a condition of existence rather than a problem to be solved.</p>
      
      <p>Going through means developing what philosopher Donna Haraway calls "staying with the trouble" – the capacity to remain present and engaged even when things are difficult, confusing, or painful. It means resisting the urge to simplify complex problems or to seek quick fixes for deep-rooted challenges.</p>
      
      <p>Going through means cultivating what psychologist Robert Kegan calls "self-transforming minds" – minds that can question their own assumptions, integrate multiple perspectives, and continuously evolve in response to new information and experiences.</p>
      
      <p>Going through is not easy. It requires courage, resilience, and a willingness to be changed by what we encounter. It requires us to hold contradictions, to live with ambiguity, and to make decisions in the face of incomplete information.</p>
      
      <p>But going through is also the only path to genuine growth and transformation. It's only by engaging with the complexity of our world that we can develop the wisdom and resilience needed to navigate it. It's only by facing our challenges directly that we can discover new possibilities and create more humane and sustainable ways of living.</p>
      
      <p>The way out is through. There are no shortcuts, no escape routes, no technological fixes that will allow us to bypass the difficult work of transformation. But if we have the courage to go through – to engage with the complexity of our time with open minds and hearts – we may find that the other side is worth the journey.</p>
    `,
  },
  {
    slug: "the-kids-are-alright",
    title: "The Kids are Alright",
    date: "October 24, 2023",
    publication: "Avanathropology",
    content: `
      <p>There's a perennial tendency among older generations to worry about the young. They're spending too much time on their phones. They're not reading enough books. They're not developing the social skills they need. They're not prepared for the "real world."</p>
      
      <p>These concerns are understandable. The world is changing rapidly, and it's natural to worry that young people aren't being equipped with the skills and knowledge they need to navigate it. But these worries often say more about our own anxieties and resistance to change than they do about the actual capabilities and prospects of young people.</p>
      
      <p>The truth is, young people have always found ways to adapt to the world they inherit. They develop the skills they need for the environments they actually live in, not the ones their elders remember or imagine. And in many ways, today's young people are better equipped for the contemporary world than previous generations.</p>
      
      <p>Consider digital literacy. While older generations often struggle with new technologies and platforms, young people navigate them with ease. They understand the unwritten rules of different digital spaces, the nuances of online communication, and the strategies for finding and evaluating information online. These are crucial skills in a world where so much of our work, learning, and social interaction happens digitally.</p>
      
      <p>Or consider adaptability. Young people today are growing up in a world of constant change and uncertainty. They don't expect stable, linear career paths or fixed social structures. Instead, they're developing the flexibility and resilience needed to navigate a fluid, unpredictable environment. They're comfortable with change in a way that many older people are not.</p>
      
      <p>Or consider social awareness. Despite concerns about "screen time" reducing empathy, young people today show remarkable concern for social justice, environmental sustainability, and the well-being of others. They're attuned to the interconnectedness of global challenges and the need for collective action to address them.</p>
      
      <p>This isn't to say that young people don't face real challenges or that all concerns about their development are unfounded. The mental health impacts of social media, the pressures of an uncertain economic future, and the legacy of educational disruptions during the pandemic are all serious issues that deserve attention and support.</p>
      
      <p>But we should be careful not to let our own discomfort with change color our perceptions of young people's capabilities and prospects. The kids are alright. They're developing the skills and perspectives they need for the world they're actually living in, not the world we remember or wish for. And in many ways, they're better prepared for the future than we are.</p>
      
      <p>Instead of worrying about whether young people are measuring up to our standards, perhaps we should be learning from their adaptability, their digital fluency, and their awareness of the interconnected challenges we all face. The future belongs to them, after all. And they might just be better at navigating it than we expect.</p>
    `,
  },
  {
    slug: "a-poem-about-money",
    title: "a poem about money",
    date: "October 31, 2023",
    publication: "Avanathropology",
    content: `
      <p class="whitespace-pre-line">
money is not a thing
but a relationship
a promise
a story we tell each other

money is not in the coin
or the bill
or the number in your account
but in the space between us

money is not what you have
but what others believe you have
not what you can buy
but what others believe you can buy

money is fiction
but fiction with force
a collective hallucination
that builds cities and tears them down

money is language
spoken in the dialect of desire
a grammar of getting
a vocabulary of value

money is memory
of debts unpaid
of gifts ungiven
of worth unacknowledged

money is magic
that transforms time into things
labor into luxury
scarcity into status

money is mirror
reflecting what we love
what we fear
what we think we deserve

money is measure
not of worth
but of what we agree
is worthy of measure

money is not evil
nor is it good
it is a tool
and tools take the shape of the hands that hold them

money is not a thing
but a relationship
a promise
a story we tell each other
      </p>
    `,
  },
  {
    slug: "the-anti-anti-social-club",
    title: "The Anti Anti Social Club",
    date: "November 15, 2023",
    publication: "Avanathropology",
    content: `
      <p>In recent years, there's been a growing concern about the decline of social connection and community in modern life. Books like "Bowling Alone" and "The Lonely Crowd" document the fraying of social bonds, while headlines warn of a "loneliness epidemic" affecting people of all ages. The rise of digital technology is often blamed for this trend, with critics arguing that screens and social media have replaced genuine human connection with shallow digital interactions.

But what if this narrative is incomplete? What if, alongside the undeniable challenges of modern social life, new forms of community and connection are emerging? This is the premise of what I call "The Anti Anti Social Club" – a loose collection of individuals and groups who are finding innovative ways to foster meaningful connection in the digital age.

The members of this unofficial "club" aren't united by a shared ideology or platform. Rather, they're united by a common approach: they reject both uncritical techno-optimism and reflexive techno-pessimism. They acknowledge the real challenges of building community in the digital age, but they're actively experimenting with new models rather than simply lamenting what's been lost.

These experiments take many forms. Some are creating hybrid online/offline communities that use digital tools to facilitate real-world gatherings. Others are developing new platforms and spaces designed specifically to foster deeper connection rather than maximize engagement metrics. Still others are reviving and reinventing traditional forms of community – from dinner parties to reading groups to neighborhood associations – adapting them for contemporary life.

What unites these diverse efforts is a recognition that meaningful connection requires intention and design. It doesn't just happen automatically, whether online or offline. It requires creating the right conditions, establishing the right norms, and investing the necessary time and energy.

The Anti Anti Social Club is not anti-technology. Its members recognize that digital tools, when thoughtfully designed and intentionally used, can enhance rather than diminish human connection. But they're also not uncritical adopters of every new platform or app. They're discerning users who evaluate technologies based on whether they genuinely serve human needs for connection and community.

In a world that often seems increasingly fragmented and isolated, the emergence of these new approaches to community and connection offers reason for cautious optimism. The social fabric may be changing, but it's not simply unraveling – it's being rewoven in new patterns that we're still learning to recognize and understand.

The challenge for all of us is to become more intentional designers of our social lives – to critically examine the spaces, platforms, and practices that shape our connections with others, and to actively create and support environments that foster the kind of deep, meaningful relationships that we all need to thrive.

The Anti Anti Social Club isn't waiting for someone else to solve the problem of social disconnection. Its members are taking matters into their own hands, experimenting with new forms of community suited to the complexities of contemporary life. And in doing so, they're showing that the future of social connection might be different from the past, but it need not be diminished.
    `,
  },
]

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const article = articles.find((article) => article.slug === params.slug)

  if (!article) {
    notFound()
  }

  return (
    <div className="container max-w-3xl mx-auto px-4 py-6">
      <header className="flex justify-between items-center mb-4">
        <Link href="/" className="flex items-center text-primary hover:underline text-sm">
          <ArrowLeft className="h-3 w-3 mr-1" />
          Home
        </Link>
        <ThemeToggle />
      </header>

      <article className="mb-8">
        <div className="mb-4">
          <div className="text-xs text-primary mb-1">{article.publication}</div>
          <h1 className="text-2xl font-bold mb-1">{article.title}</h1>
          <div className="text-xs text-muted-foreground">{article.date}</div>
        </div>

        <div
          className="prose dark:prose-invert max-w-none prose-sm"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />
      </article>

      <div className="border-t pt-4">
        <h3 className="text-base font-medium mb-2">More from {article.publication}</h3>
        <ul className="space-y-1 text-sm">
          {articles
            .filter((a) => a.publication === article.publication && a.slug !== article.slug)
            .slice(0, 3)
            .map((relatedArticle) => (
              <li key={relatedArticle.slug} className="group flex">
                <span className="text-muted-foreground w-24 shrink-0">{relatedArticle.date.split(" ")[0]}</span>
                <Link href={`/writing/${relatedArticle.slug}`} className="hover:text-primary">
                  {relatedArticle.title}
                </Link>
              </li>
            ))}
        </ul>
      </div>
    </div>
  )
}

