"use client";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty, 
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";


// Esquema del formulario
const formSchema = z.object({
  Project_ID: z.string(),
  Hole_ID: z.string().min(10),
  Depth_From: z.number(),
  Depth_To: z.number(),
  Lithology_Type: z.string(), //  Lithology_Type
  Qz_Vt: z.number(), //  Weathering_Type
  Qz_Alt: z.number(), //Natural_Break_Count
  Sulphides: z.number(), //Broken_Zone_Count
  Bleaching: z.number(),
  Carbonates: z.number(),
  Limonites: z.number(),
  Sulphides_As: z.number(),
  Sulphides_Py: z.number(),
  Sulphides_Sp: z.number(),
  Sulphides_Cpy: z.number(),
  Sulphides_Po: z.number(),
  Sulphides_Undiff: z.number(),
  Bleaching_Cly: z.number(),
  Bleaching_Ser: z.number(),
  Bleaching_Alb: z.number(),
  Silicification: z.number(),
  Veinlets_Qz_Po: z.number(),
  Veinlets_Qz_Py: z.number(),
  Veinlets_Py_As: z.number(),
  Veinlets_Qz_Su: z.number(),
  Veinlets_Ca: z.number(),
  Veinlets_Qz_Ca: z.number(),
  Veinlets_Sulf: z.number(),
  Veinlets_Qz_Undiff: z.number(),
  Veinlets_Bt: z.number(),
  Comments: z.string(),
});

// Opciones para el tipo de estructura
const Lithology_Types = [
  { value: "CBBX", label: "CBBX" },
  { value: "CBSK", label: "CBSK" },
  { value: "CBVN", label: "CBVN" },
  { value: "CCSK", label: "CCSK" },
  { value: "CLAY", label: "CLAY" },
  { value: "CQSV", label: "CQSV" },
  { value: "CSVN", label: "CSVN" },
  { value: "FLTZ", label: "FLTZ" },
  { value: "FTVZ", label: "FTVZ" },
  { value: "GDR", label: "GDR" },
  { value: "GRGA", label: "GRGA" },
  { value: "HMBX", label: "HMBX" },
  { value: "HQBX", label: "HQBX" },
  { value: "IADK", label: "IADK" },
  { value: "IAND", label: "IAND" },
  { value: "IAPL", label: "IAPL" },
  { value: "IDAP", label: "IDAP" },
  { value: "IDIO", label: "IDIO" },
  { value: "IDMZ", label: "IDMZ" },
  { value: "IDOL", label: "IDOL" },
  { value: "IDPP", label: "IDPP" },
  { value: "IDQP", label: "IDQP" },
  { value: "IFE", label: "IFE" },
  { value: "IGAB", label: "IGAB" },
  { value: "IGDI", label: "IGDI" },
  { value: "IGDK", label: "IGDK" },
  { value: "ILAM", label: "ILAM" },
  { value: "IMNZ", label: "IMNZ" },
  { value: "IOPP", label: "IOPP" },
  { value: "IPEG", label: "IPEG" },
  { value: "ITON", label: "ITON" },
  { value: "IUMF", label: "IUMF" },
  { value: "KCHF", label: "KCHF" },
  { value: "KGPM", label: "KGPM" },
  { value: "KGPS", label: "KGPS" },
  { value: "KIHF", label: "KIHF" },
  { value: "KMCS", label: "KMCS" },
  { value: "KMSS", label: "KMSS" },
  { value: "KSHF", label: "KSHF" },
  { value: "KSSS", label: "KSSS" },
  { value: "KVHF", label: "KVHF" },
  { value: "LOST", label: "LOST" },
  { value: "MSSV", label: "MSSV" },
  { value: "MYLO", label: "MYLO" },
  { value: "OVB", label: "OVB" },
  { value: "OXVN", label: "OXVN" },
  { value: "QALT", label: "QALT" },
  { value: "QCVN", label: "QCVN" },
  { value: "QZBX", label: "QZBX" },
  { value: "QZSK", label: "QZSK" },
  { value: "QZVN", label: "QZVN" },
  { value: "SCCC", label: "SCCC" },
  { value: "SCCD", label: "SCCD" },
  { value: "SCCH", label: "SCCH" },
  { value: "SGWK", label: "SGWK" },
  { value: "SHZN", label: "SHZN" },
  { value: "SOIL", label: "SOIL" },
  { value: "SPHY", label: "SPHY" },
  { value: "SPL", label: "SPL" },
  { value: "SUBX", label: "SUBX" },
  { value: "SUVN", label: "SUVN" },
  { value: "SVC", label: "SVC" },
  { value: "SVCL", label: "SVCL" },
  { value: "VALT", label: "VALT" },
  { value: "VAND", label: "VAND" },
  { value: "VAPP", label: "VAPP" },
  { value: "VATT", label: "VATT" },
  { value: "VDA", label: "VDA" },
  { value: "VDPP", label: "VDPP" },
  { value: "VRYL", label: "VRYL" },
] as const;



export default function ReloggingPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      Project_ID: "",
      Hole_ID: "",
      Depth_From: 0,
      Depth_To: 0,
      Lithology_Type: "", // Valor inicial vacío
      Qz_Vt: 0, // Valor inicial vacío
      Qz_Alt: 0, // Valor inicial vacío
      Sulphides: 0, // Valor inicial vacío
      Bleaching: 0, // Valor inicial vacío
      Carbonates: 0,
      Limonites: 0,
      Sulphides_As: 0,
      Sulphides_Py: 0,
      Sulphides_Sp: 0,
      Sulphides_Cpy: 0,
      Sulphides_Po: 0,
      Sulphides_Undiff: 0,
      Bleaching_Cly: 0,
      Bleaching_Ser: 0,
      Bleaching_Alb: 0,
      Silicification: 0,
      Veinlets_Qz_Po: 0,
      Veinlets_Qz_Py: 0,
      Veinlets_Py_As: 0,
      Veinlets_Qz_Su: 0,
      Veinlets_Ca: 0,
      Veinlets_Qz_Ca: 0,
      Veinlets_Sulf: 0,
      Veinlets_Qz_Undiff: 0,
      Veinlets_Bt: 0,
      Comments: "",
    },
  });

  
  const router = useRouter();

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1>Relogging</h1>
      <div>
      
        <Form {...form}>

      <h1>Tesoro Gold</h1>
        <h2>Relogging</h2>
        
        <FormField
        control={form.control}
        name="Project_ID"
        render={({ field }) => (
              <FormItem className="space-y-3">
              <FormLabel>Project</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="El Zorro" id="el-zorro" />
                    <Label htmlFor="el-zorro">El Zorro</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Culpeo" id="culpeo" />
                    <Label htmlFor="culpeo">Culpeo</Label>
                  </div>
                  </RadioGroup>
              </FormControl>
              <FormMessage />
              </FormItem>
            )}
            />

          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* Campo Hole ID */}
            <FormField
              control={form.control}
              name="Hole_ID"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Hole ID</FormLabel>
                  <FormControl>
                    <Input placeholder="Hole ID" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Campo Depth From */}
            <FormField
              control={form.control}
              name="Depth_From"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>From</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="0"
                      type="number"
                      {...field}
                      onChange={(e) => field.onChange(e.target.valueAsNumber)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Campo To */}
            <FormField
              control={form.control}
              name="Depth_To"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>To</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="0"
                      type="number"
                      {...field}
                      onChange={(e) => field.onChange(e.target.valueAsNumber)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Campo Lithology_Type con Popover */}
            <FormField
              control={form.control}
              name="Lithology_Type"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Lithology</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "w-[200px] justify-between",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value
                            ? Lithology_Types.find(
                                (type) => type.value === field.value
                              )?.label
                            : "Select Lithology"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandInput placeholder="Search lithology type..." />
                        <CommandEmpty>No lithology found.</CommandEmpty>
                        <CommandGroup>
                          <CommandList>
                            {Lithology_Types.map((type) => (
                              <CommandItem
                                value={type.label}
                                key={type.value}
                                onSelect={() => {
                                  form.setValue("Lithology_Type", type.value);
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    type.value === field.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                                {type.label}
                              </CommandItem>
                            ))}
                          </CommandList>
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

              <h1>QZ</h1>
              <hr></hr>

            {/* Campo Natural_Break_Count */}

            <FormField
              control={form.control}
              name="Qz_Vt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Vt</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="0"
                      type="number"
                      {...field}
                      onChange={(e) => field.onChange(e.target.valueAsNumber)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="Comments"
              render={({ field }) => (
            <FormItem>
            <FormLabel>Commentaries</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Additonal commentaries"
                className="min-h-[100px]"
                    {...field}
              />
            </FormControl>
            <FormMessage />
         </FormItem>
        )}
/>

            {/* Botón de envío */}
            <Button type="submit">Submit</Button>
          </form>
        </Form>

        <Button 
          variant="outline" 
          onClick={() => router.push('/')} // Cambia
        >
          Home
        </Button>   


      </div>
    </div>
  );
}