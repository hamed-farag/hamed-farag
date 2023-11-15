import { Card, CardHeader, CardContent, CardFooter } from "@components/ui/Card";

import { Avatar, AvatarFallback, AvatarImage } from "@components/ui/Avatar";

import { getUser } from "@services/user";

export async function AboutCard() {
  const user = await getUser();

  if (!user) throw new Error("src/data/about.mdx not found");

  return (
    <Card>
      <CardHeader></CardHeader>
      <CardContent>
        <section className="grid grid-cols-4 gap-4">
          <Avatar className="h-32 w-32">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback>{user.name}</AvatarFallback>
          </Avatar>
          <section dangerouslySetInnerHTML={{ __html: user.content }} />
        </section>
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
}
