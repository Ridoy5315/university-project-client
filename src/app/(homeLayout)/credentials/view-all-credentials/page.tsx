
import CredentialsTable from "@/components/modules/Credentials/CredentialsTable"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getUserCredentials } from "@/services/credentials/credentials.service"


const ViewAllCredentialsPage = async() => {
  const credentials = await getUserCredentials();
  const userCredentials = credentials?.data;
  return (

<div className="w-full px-4 md:px-10 lg:px-20 py-6">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-semibold tracking-tight">My Credentials</h1>

        <p className="text-muted-foreground mt-1">
          Securely manage all your saved accounts in one place.
        </p>
      </div>

      {/* Card Container */}
      <Card className="shadow-sm border rounded-xl">
        <CardHeader>
          <CardTitle className="text-lg">
            Saved Accounts ({userCredentials?.length || 0})
          </CardTitle>
          <CardDescription>
            View, edit, or delete your stored credentials anytime.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <ScrollArea className="w-full h-[500px] rounded-md border p-4">
            <CredentialsTable data={userCredentials} />
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  )
}

export default ViewAllCredentialsPage