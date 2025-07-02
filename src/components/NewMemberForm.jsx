import { useState } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import axios from "axios";

const initialForm = {
  fullName: "",
  email: "",
  notes: "",
};

export default function NewMemberForm({ addMember }) {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // API'ye POST isteği
      await axios.post(
        "https://jsonplaceholder.typicode.com/posts",
        form
      );
      addMember({ ...form }); // TEST addMember'ın bu şekilde çağrılmasını bekliyor!
      setForm(initialForm);   // Formu sıfırladım
    } catch (err) {
      alert("Üye eklenemedi. Lütfen tekrar deneyin.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label for="fullName">Ad Soyad</Label>
        <Input
          id="fullName"
          name="fullName"
          value={form.fullName}
          onChange={handleChange}
          required
        />
      </FormGroup>
      <FormGroup>
        <Label for="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          required
        />
      </FormGroup>
      <FormGroup>
        <Label for="notes">Notlar</Label>
        <Input
          id="notes"
          name="notes"
          value={form.notes}
          onChange={handleChange}
          type="textarea"
        />
      </FormGroup>
      <Button type="submit" color="primary" disabled={loading}>
        {loading ? "Ekleniyor..." : "Kaydet"}
      </Button>
    </Form>
  );
}
