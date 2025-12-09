import AddNewCredentialForm from "@/components/modules/Credentials/AddNewCredential"

const AddNewCredentialPage = async() => {
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-6">
  <div className="w-full max-w-2xl bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border p-10 space-y-8">
    
    {/* Header */}
    <div className="text-center space-y-3">
      <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
        Add New Credential
      </h1>
      <p className="text-gray-600 text-sm">
        Securely store your login information in your encrypted vault.
      </p>
    </div>

    {/* Form */}
    <AddNewCredentialForm />
  </div>
</div>

  )
}

export default AddNewCredentialPage