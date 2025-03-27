import AddProductForm from "../../components/AddProductForm";

export default function AdminPage() {
  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-semibold my-4">Admin Panel</h1>

      <AddProductForm />
    </div>
  );
}
