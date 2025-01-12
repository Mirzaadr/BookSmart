"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import FileUpload from "@/components/FileUpload";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { Loader2 } from "lucide-react";
import { bookSchema } from "@/lib/validations";
import z from 'zod';
import { Textarea } from "@/components/ui/textarea";
import ColorPicker from "@/components/ColorPicker";
import { createBook } from "@/lib/admin/actions/book";

interface BookFormProps extends Partial<Book> {
  type?: "CREATE" | "UPDATE";
}

const buttonText = {
  "CREATE": "Add Book to Library",
  "UPDATE": "Update",
}

const BookForm = ({
  type="CREATE",
  ...book
}: BookFormProps) => {
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof bookSchema>>({
    resolver: zodResolver(bookSchema),
    defaultValues: {
      title: "",
      description: "",
      author: "",
      genre: "",
      rating: 1,
      totalCopies: 1,
      coverUrl: "",
      coverColor: "",
      videoUrl: "",
      summary: "",
    },
    // disabled: isPending,
  });

  const router = useRouter();

  const onSubmit = async (values: z.infer<typeof bookSchema>) => {
    // console.log(values)
    startTransition(async () => {
      const result = await createBook(values);
      if (result.success) {
        toast({
          title: "Success",
          description: type === "CREATE"
            ? "Book created successfully."
            : "You have updated the book.",
        });
        router.push(`/admin/books/${result.data.id}`)
      } else {
        toast({
          title: `Error ${type === "CREATE" ? "Creating" : "Updating"} Book`,
          description: result.error ?? "An error occurred.",
          variant: "destructive",
        });
      }
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
      <FormField
        control={form.control}
        name={"title"}
        render={({ field }) => (
          <FormItem className="flex flex-col gap-1">
            <FormLabel className="text-base font-normal text-dark-500">
              Book Title
            </FormLabel>
            <FormControl>
              <Input 
                required
                placeholder="Book Title"
                {...field} 
                className="book-form_input"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name={"author"}
        render={({ field }) => (
          <FormItem className="flex flex-col gap-1">
            <FormLabel className="text-base font-normal text-dark-500">
              Author
            </FormLabel>
            <FormControl>
              <Input 
                required
                placeholder="Book Author"
                {...field} 
                className="book-form_input"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name={"genre"}
        render={({ field }) => (
          <FormItem className="flex flex-col gap-1">
            <FormLabel className="text-base font-normal text-dark-500">
              Genre
            </FormLabel>
            <FormControl>
              <Input 
                required
                placeholder="Book Genre"
                {...field} 
                className="book-form_input"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name={"rating"}
        render={({ field }) => (
          <FormItem className="flex flex-col gap-1">
            <FormLabel className="text-base font-normal text-dark-500">
              Rating
            </FormLabel>
            <FormControl>
              <Input 
                type="number"
                min={1}
                max={5}
                placeholder="Book Rating"
                {...field} 
                className="book-form_input"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name={"totalCopies"}
        render={({ field }) => (
          <FormItem className="flex flex-col gap-1">
            <FormLabel className="text-base font-normal text-dark-500">
              Total Copies
            </FormLabel>
            <FormControl>
              <Input 
                type="number"
                min={1}
                max={10000}
                placeholder="Total Copies"
                {...field} 
                className="book-form_input"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name={"coverUrl"}
        render={({ field }) => (
          <FormItem className="flex flex-col gap-1">
            <FormLabel className="text-base font-normal text-dark-500">
              Book Image
            </FormLabel>
            <FormControl>
              <FileUpload
                type="image"
                accept="image/*"
                placeholder="Upload a book cover"
                folder="books/cover"
                variant="light"
                onFileChange={field.onChange}
                value={field.value}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name={"coverColor"}
        render={({ field }) => (
          <FormItem className="flex flex-col gap-1">
            <FormLabel className="text-base font-normal text-dark-500">
              Primary Color
            </FormLabel>
            <FormControl>
              <ColorPicker onPickerChange={field.onChange} value={field.value}/>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name={"description"}
        render={({ field }) => (
          <FormItem className="flex flex-col gap-1">
            <FormLabel className="text-base font-normal text-dark-500">
              Book Description
            </FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Book Description"
                rows={10}
                {...field}
                className="book-form_input"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name={"videoUrl"}
        render={({ field }) => (
          <FormItem className="flex flex-col gap-1">
            <FormLabel className="text-base font-normal text-dark-500">
              Book Trailer
            </FormLabel>
            <FormControl>
              <FileUpload
                type="video"
                accept="video/*"
                placeholder="Upload a book trailer"
                folder="books/video"
                variant="light"
                onFileChange={field.onChange}
                value={field.value}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name={"summary"}
        render={({ field }) => (
          <FormItem className="flex flex-col gap-1">
            <FormLabel className="text-base font-normal text-dark-500">
              Book Summary
            </FormLabel>
            <FormControl>
            <Textarea 
                placeholder="Book Summary"
                rows={10}
                {...field}
                className="book-form_input"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <Button type="submit" className="book-form_btn" disabled={isPending}>
        {isPending ? (
          <>
            <Loader2 className="size-4 mr-2 animate-spin"/>
            Please Wait ...
          </>
        ) : buttonText[type]}
      </Button>
      </form>
    </Form>
  )
}

export default BookForm;