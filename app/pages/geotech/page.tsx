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

export interface Props {
  term: string;
}

// Esquema del formulario
const formSchema = z.object({
  Project_ID: z.string(),
  Hole_ID: z.string().min(3),
  Logged_By: z.string().min(3),
  Core_Diameter: z.string(),
  Depth_From: z.number().min(0),
  Depth_To: z.number().min(0),
  Length: z.number().min(0),
  CL: z.number(),
  Lithology_Type: z.string(), //  Lithology_Type
  Weathering_Type: z.string(), //  Weathering_Type
  Natural_Break_Count: z.number(), //Natural_Break_Count
  Broken_Zone_Count: z.number(), //Broken_Zone_Count
  Core_10: z.number(),
  RQD: z.number(),
  Discontinuity_Type: z.string(),
  Joint_Set_Count: z.string(),
  Roughness: z.string(),
  Joint_SSHR: z.string(),
  Infill: z.string(),
  Infill_thickness: z.string(),
  QSI: z.string(),
  Commentaries: z.string(),
  FF: z.number(),
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
  { value: "SUBX", label: "SUBX" },
  { value: "SUVN", label: "SUVN" },
  { value: "SVCL", label: "SVCL" },
  { value: "VALT", label: "VALT" },
  { value: "VAND", label: "VAND" },
  { value: "VAPP", label: "VAPP" },
  { value: "VATT", label: "VATT" },
  { value: "VDA", label: "VDA" },
  { value: "VDPP", label: "VDPP" },
  { value: "VRYL", label: "VRYL" },
] as const;


// Opciones para el tipo de texture
const Weathering_Types = [
  { value: "CW", label: "CW" },
  { value: "HW", label: "HW" },
  { value: "MW", label: "MW" },
  { value: "SW", label: "SW" },
  { value: "FR", label: "FR" },
] as const;


// Opciones para el tipo de discontinuidad

const Discontinuity_Types = [
  { value: "JOI", label: "JOI" },
  { value: "CON", label: "CON" },
  { value: "ZON", label: "ZON" },
  { value: "FOL", label: "FOL" },
  { value: "BED", label: "BED" },
  { value: "VEI", label: "VEI" },
  { value: "DIS", label: "DIS" },
  { value: "OXI", label: "OXI" },
  { value: "SAP", label: "SAP" },
  { value: "DSC", label: "DSC" },
] as const;

const JointSetCount_Types = [
  { value: "0", label: "0" },
  { value: "0.5", label: "0.5" },
  { value: "1", label: "1" },
  { value: "1.5", label: "1.5" },
  { value: "2", label: "2" },
  { value: "2.5", label: "2.5" },
  { value: "3", label: "3" },
  { value: "3.5", label: "3.5" },
  { value: "4", label: "4" },
  { value: "5", label: "5" },
] as const;


// Opciones Roughness_types
const Roughness_Types = [
  { value: "RAD", label: "RAD" },
  { value: "SMD", label: "SMD" },
  { value: "SSD", label: "SSD" },
  { value: "RAU", label: "RAU" },
  { value: "SMU", label: "SMU" },
  { value: "SSU", label: "SSU" },
  { value: "RAP", label: "RAP" },
  { value: "SMP", label: "SMP" },
  { value: "SSP", label: "SSP" },
  { value: "GPU", label: "GPU" },
] as const;

// Opciones Infill_Types
const Infill_Types = [
  { value: "BAD", label: "BAD" },
  { value: "MOD", label: "MOD" },
  { value: "NON", label: "NON" },
  { value: "SLI", label: "SLI" },
  { value: "SOF", label: "SOF" },
  { value: "UNA", label: "UNA" },
] as const;

// Opciones Infill_Thickness_Types
const Infill_Thickness_Types = [
  { value: "NWC", label: "NWC" },
  { value: "t<1", label: "t<1" },
  { value: "t<5", label: "t<5" },
  { value: "t>5", label: "t>5" },
] as const;

// Opciones QSI_Types

const QSI_Types = [
  { value: "C", label: "C" },
  { value: "R0", label: "R0" },
  { value: "R1", label: "R1" },
  { value: "R2", label: "R2" },
  { value: "R3", label: "R3" },
  { value: "R4", label: "R4" },
  { value: "R5", label: "R5" },
  { value: "R6", label: "R6" },
] as const;


export default function GeotechnicalPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      Project_ID: "",
      Hole_ID: "",
      Logged_By: "",
      Core_Diameter: "",
      Depth_From: 0,
      Depth_To: 0,
      Length: 0,
      Lithology_Type: "", // Valor inicial vacío
      Weathering_Type: "", // Valor inicial vacío
      Natural_Break_Count: 0, // Valor inicial vacío
      Broken_Zone_Count: 0, // Valor inicial vacío
      Core_10: 0, // Valor inicial vacío
      RQD: 0,
      Discontinuity_Type: "",
      Joint_Set_Count: "",
      Roughness: "",
      Joint_SSHR: "",
      Infill: "",
      Infill_thickness: "",
      QSI: "",
      Commentaries: "",
      FF: 0,
    },
  });

  
  const depthFrom = form.watch("Depth_From");
  const depthTo = form.watch("Depth_To");

  React.useEffect(() => {
    const newLength = depthTo >= depthFrom ? depthTo - depthFrom : 0;
    form.setValue("Length", Number(newLength.toFixed(2))); // Redondear a 2 decimales
  }, [depthFrom, depthTo, form]);
  

  const router = useRouter();

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1>Geotechnical Logging</h1>
      <div>
      
        <Form {...form}>

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

            {/* Campo Logged By */}
            <FormField
              control={form.control}
              name="Logged_By"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Logged By</FormLabel>
                  <FormControl>
                    <Input placeholder="Logged By" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Campo Core_Diameter */}
            <FormField
              control={form.control}
              name="Core_Diameter"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Core Diameter</FormLabel>
                  <FormControl>
                    <Input placeholder="Core Diameter" {...field} />
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

            {/* Campo Length */}
            <FormField
              control={form.control}
              name="Length"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Length</FormLabel>
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
                        <CommandList>
                          <CommandGroup>
                            {Lithology_Types.map((type) => (
                              <CommandItem
                                value={type.value}
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
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />


              {/* Campo Weathering_Types con Popover */}
          <FormField
            control={form.control}
            name="Weathering_Type"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Weathering</FormLabel>
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
                          ? Weathering_Types.find(
                              (type) => type.value === field.value
                            )?.label
                          : "Select Weathering"}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <Command>
                      <CommandInput placeholder="Search weathering type..." />
                      <CommandEmpty>No weathering found.</CommandEmpty>
                      <CommandGroup>
                        <CommandList>
                          {Weathering_Types.map((type) => (
                            <CommandItem
                              value={type.label}
                              key={type.value}
                              onSelect={() => {
                                form.setValue("Weathering_Type", type.value);
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

            {/* Campo Natural_Break_Count */}

            <FormField
              control={form.control}
              name="Natural_Break_Count"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Natural Break Count</FormLabel>
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

            {/* Campo Broken_Zone_Count */}

            <FormField
              control={form.control}
              name="Broken_Zone_Count"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Broken Zone Count</FormLabel>
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

            {/* Campo Core > 10cm */}

            <FormField
              control={form.control}
              name="Core_10"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Core {'>'} 10 cm</FormLabel>
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

            {/* Campo RQD */}

            <FormField
              control={form.control}
              name="RQD"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>RQD count {'(check)'}</FormLabel>
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


            {/* Campo Discontinuity_Types con Popover */}
        <FormField
          control={form.control}
          name="Discontinuity_Type"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Discontinuity Type</FormLabel>
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
                        ? Discontinuity_Types.find(
                            (type) => type.value === field.value
                          )?.label
                        : "Select Discontinuity Type"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput placeholder="Search discontinuity type..." />
                    <CommandEmpty>No discontinuity type found.</CommandEmpty>
                    <CommandGroup>
                      <CommandList>
                        {Discontinuity_Types.map((type) => (
                          <CommandItem
                            value={type.label}
                            key={type.value}
                            onSelect={() => {
                              form.setValue("Discontinuity_Type", type.value);
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

        {/* Campo Joint Set Count con Popover */}
        <FormField
          control={form.control}
          name="Joint_Set_Count"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Joint Set Count</FormLabel>
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
                        ? JointSetCount_Types.find(
                            (type) => type.value === field.value
                          )?.label
                        : "Select Joint Set Count Type"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput placeholder="Search joint set count type..." />
                    <CommandEmpty>No joint set count type found.</CommandEmpty>
                    <CommandGroup>
                      <CommandList>
                        {JointSetCount_Types.map((type) => (
                          <CommandItem
                            value={type.label}
                            key={type.value}
                            onSelect={() => {
                              form.setValue("Joint_Set_Count", type.value);
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

            {/* Campo Roughness con Popover */}
            <FormField
              control={form.control}
              name="Roughness"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Roughness</FormLabel>
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
                            ? Roughness_Types.find(
                                (type) => type.value === field.value
                              )?.label
                            : "Select Roughness"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandInput placeholder="Search roughness..." />
                        <CommandEmpty>No roughness found.</CommandEmpty>
                        <CommandGroup>
                          <CommandList>
                            {Roughness_Types.map((type) => (
                              <CommandItem
                                value={type.label}
                                key={type.value}
                                onSelect={() => {
                                  form.setValue("Roughness", type.value);
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

            {/* Joint Surface Strength to Host Rock */}
          <FormField
          control={form.control}
          name="Joint_SSHR"
          render={({ field }) => (
                <FormItem className="space-y-3">
                <FormLabel>Joint Surface Strength to Host Rock</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="1" id="one" />
                      <Label htmlFor="one">1</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="2" id="two" />
                      <Label htmlFor="two">2</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="3" id="three" />
                      <Label htmlFor="three">3</Label>
                    </div>
                    </RadioGroup>
                </FormControl>
                <FormMessage />
                </FormItem>
              )}
              />

            {/* Campo Infil con Popover */}
            <FormField
              control={form.control}
              name="Infill"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Infill</FormLabel>
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
                            ? Infill_Types.find(
                                (type) => type.value === field.value
                              )?.label
                            : "Select Infill"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandInput placeholder="Search infill..." />
                        <CommandEmpty>No infill found.</CommandEmpty>
                        <CommandGroup>
                          <CommandList>
                            {Infill_Types.map((type) => (
                              <CommandItem
                                value={type.label}
                                key={type.value}
                                onSelect={() => {
                                  form.setValue("Infill", type.value);
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

            {/* Campo Infill_Thickness con Popover */}
            <FormField
              control={form.control}
              name="Infill_thickness"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Infill Thickness</FormLabel>
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
                            ? Infill_Thickness_Types.find(
                                (type) => type.value === field.value
                              )?.label
                            : "Select Infill Thickness"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandInput placeholder="Search infill thickness..." />
                        <CommandEmpty>No infill thickness found.</CommandEmpty>
                        <CommandGroup>
                          <CommandList>
                            {Infill_Thickness_Types.map((type) => (
                              <CommandItem
                                value={type.label}
                                key={type.value}
                                onSelect={() => {
                                  form.setValue("Infill_thickness", type.value);
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

            {/* Campo QSI_Types con Popover */}
            <FormField
              control={form.control}
              name="QSI"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>QSI - Quality Strength Index</FormLabel>
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
                            ? QSI_Types.find(
                                (type) => type.value === field.value
                              )?.label
                            : "Select QSI"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandInput placeholder="Search QSI..." />
                        <CommandEmpty>No QSI found.</CommandEmpty>
                        <CommandGroup>
                          <CommandList>
                            {QSI_Types.map((type) => (
                              <CommandItem
                                value={type.label}
                                key={type.value}
                                onSelect={() => {
                                  form.setValue("QSI", type.value);
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

            <FormField
              control={form.control}
              name="Commentaries"
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

{/* Campo FF */}
<FormField
  control={form.control}
  name="FF"
  render={({ field }) => (
    <FormItem>
      <FormLabel>FF</FormLabel>
      <FormControl>
        <Input placeholder="FF" {...field} />
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