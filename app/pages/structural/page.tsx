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
  Logged_By: z.string().min(10),
  Depth_From: z.number(),
  alpha_num: z.number(),
  beta_num: z.number(),
  Structure_Type: z.string(), //  Structure_Type
  Texture_Type: z.string(), //  Texture_Type
  Min_Ass_1: z.string(), //Min1
  Min_Ass_2: z.string(), //Min2
  Min_Ass_3: z.string(), //Min3
  Thickness: z.number(),
  Open: z.string(),
  Roughness: z.string(),
  Infill: z.string(),
  Infill_thickness: z.string(),
  Commentaries: z.string(),
});

// Opciones para el tipo de estructura
const Structure_Types = [
  { value: "BD", label: "BD" },
  { value: "BU", label: "BU" },
  { value: "CL", label: "CL" },
  { value: "CN", label: "CN" },
  { value: "CR", label: "CR" },
  { value: "FA", label: "FA" },
  { value: "FD", label: "FD" },
  { value: "FL", label: "FL" },
  { value: "FR", label: "FR" },
  { value: "FT", label: "FT" },
  { value: "FZ", label: "FZ" },
  { value: "JT", label: "JT" },
  { value: "LN", label: "LN" },
  { value: "MY", label: "MY" },
  { value: "SH", label: "SH" },
  { value: "SL", label: "SL" },
  { value: "VN", label: "VN" },
  { value: "VT", label: "VT" },
] as const;


// Opciones para el tipo de texture
const Texture_Types = [
  { value: "AM", label: "AM" },
  { value: "AN", label: "AN" },
  { value: "BA", label: "BA" },
  { value: "BB", label: "BB" },
  { value: "BD", label: "BD" },
  { value: "BU", label: "BU" },
  { value: "BW", label: "BW" },
  { value: "BX", label: "BX" },
  { value: "CM", label: "CM" },
  { value: "CR", label: "CR" },
  { value: "CV", label: "CV" },
  { value: "DS", label: "DS" },
  { value: "EQ", label: "EQ" },
  { value: "EU", label: "EU" },
  { value: "FD", label: "FD" },
  { value: "FG", label: "FG" },
  { value: "FI", label: "FI" },
  { value: "FL", label: "FL" },
  { value: "FR", label: "FR" },
  { value: "GN", label: "GN" },
  { value: "GS", label: "GS" },
  { value: "IN", label: "IN" },
  { value: "IR", label: "IR" },
  { value: "JT", label: "JT" },
  { value: "LA", label: "LA" },
  { value: "LAM", label: "LAM" },
  { value: "LN", label: "LN" },
  { value: "LY", label: "LY" },
  { value: "MA", label: "MA" },
  { value: "MTT", label: "MTT" },
  { value: "MY", label: "MY" },
  { value: "P", label: "P" },
  { value: "PA", label: "PA" },
  { value: "PB", label: "PB" },
  { value: "PC", label: "PC" },
  { value: "PG", label: "PG" },
  { value: "PK", label: "PK" },
  { value: "PL", label: "PL" },
  { value: "PR", label: "PR" },
  { value: "PU", label: "PU" },
  { value: "PV", label: "PV" },
  { value: "RO", label: "RO" },
  { value: "RU", label: "RU" },
  { value: "SH", label: "SH" },
  { value: "SL", label: "SL" },
  { value: "SO", label: "SO" },
  { value: "SS", label: "SS" },
  { value: "ST", label: "ST" },
  { value: "SV", label: "SV" },
  { value: "SW", label: "SW" },
  { value: "SX", label: "SX" },
  { value: "TF", label: "TF" },
  { value: "UN", label: "UN" },
  { value: "VN", label: "VN" },
  { value: "VT", label: "VT" },
  { value: "VUG", label: "VUG" },
  { value: "VX", label: "VX" },
  { value: "XA", label: "XA" },
] as const;



// Opciones para el mineral
const Min_Types = [
  { value: "AC", label: "AC" },
  { value: "AL", label: "AL" },
  { value: "AM", label: "AM" },
  { value: "AN", label: "AN" },
  { value: "AP", label: "AP" },
  { value: "AS", label: "AS" },
  { value: "AU", label: "AU" },
  { value: "AY", label: "AY" },
  { value: "AZ", label: "AZ" },
  { value: "BA", label: "BA" },
  { value: "BN", label: "BN" },
  { value: "BT", label: "BT" },
  { value: "CA", label: "CA" },
  { value: "CB", label: "CB" },
  { value: "CC", label: "CC" },
  { value: "CD", label: "CD" },
  { value: "CH", label: "CH" },
  { value: "CI", label: "CI" },
  { value: "CN", label: "CN" },
  { value: "CPX", label: "CPX" },
  { value: "CPY", label: "CPY" },
  { value: "CRY", label: "CRY" },
  { value: "CT", label: "CT" },
  { value: "CU", label: "CU" },
  { value: "CUO", label: "CUO" },
  { value: "CUP", label: "CUP" },
  { value: "CY", label: "CY" },
  { value: "DI", label: "DI" },
  { value: "DM", label: "DM" },
  { value: "EP", label: "EP" },
  { value: "FE", label: "FE" },
  { value: "FS", label: "FS" },
  { value: "GN", label: "GN" },
  { value: "GO", label: "GO" },
  { value: "GP", label: "GP" },
  { value: "GT", label: "GT" },
  { value: "GY", label: "GY" },
  { value: "HA", label: "HA" },
  { value: "HB", label: "HB" },
  { value: "HM", label: "HM" },
  { value: "IL", label: "IL" },
  { value: "IM", label: "IM" },
  { value: "JA", label: "JA" },
  { value: "KA", label: "KA" },
  { value: "KF", label: "KF" },
  { value: "KY", label: "KY" },
  { value: "LI", label: "LI" },
  { value: "LP", label: "LP" },
  { value: "MA", label: "MA" },
  { value: "MC", label: "MC" },
  { value: "MI", label: "MI" },
  { value: "MO", label: "MO" },
  { value: "MS", label: "MS" },
  { value: "MT", label: "MT" },
  { value: "MU", label: "MU" },
  { value: "OL", label: "OL" },
  { value: "OPX", label: "OPX" },
  { value: "OR", label: "OR" },
  { value: "PG", label: "PG" },
  { value: "PH", label: "PH" },
  { value: "PHY", label: "PHY" },
  { value: "PL", label: "PL" },
  { value: "PN", label: "PN" },
  { value: "PO", label: "PO" },
  { value: "PR", label: "PR" },
  { value: "PX", label: "PX" },
  { value: "PY", label: "PY" },
  { value: "QZ", label: "QZ" },
  { value: "SB", label: "SB" },
  { value: "SC", label: "SC" },
  { value: "SD", label: "SD" },
  { value: "SE", label: "SE" },
  { value: "SI", label: "SI" },
  { value: "SL", label: "SL" },
  { value: "SM", label: "SM" },
  { value: "SP", label: "SP" },
  { value: "SR", label: "SR" },
  { value: "ST", label: "ST" },
  { value: "SU", label: "SU" },
  { value: "TC", label: "TC" },
  { value: "TM", label: "TM" },
  { value: "TR", label: "TR" },
  { value: "TT", label: "TT" },
  { value: "WL", label: "WL" },
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
  


export default function StructuralPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      Project_ID: "El Zorro",
      Hole_ID: "ZDH",
      Logged_By: "ABC",
      Depth_From: 0,
      alpha_num: 0,
      beta_num: 0,
      Structure_Type: "", // Valor inicial vacío
      Texture_Type: "", // Valor inicial vacío
      Min_Ass_1: "", // Valor inicial vacío
      Min_Ass_2: "", // Valor inicial vacío
      Min_Ass_3: "", // Valor inicial vacío
      Thickness: 0,
      Open: "Open",
      Roughness: "RAD",
      Infill: "BAD",
      Infill_thickness: "nwc",
      Commentaries: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  
  const router = useRouter();

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1>Structural Data</h1>
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
                    <Input placeholder="ABC" {...field} />
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
                    <Input placeholder="RCH00001" {...field} />
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
                  <FormLabel>Depth From</FormLabel>
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

            {/* Campo Alpha */}
            <FormField
              control={form.control}
              name="alpha_num"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Alpha</FormLabel>
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

            {/* Campo Beta */}
            <FormField
              control={form.control}
              name="beta_num"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Beta</FormLabel>
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

            {/* Campo Structure Type con Popover */}
            <FormField
              control={form.control}
              name="Structure_Type"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Structure Type</FormLabel>
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
                            ? Structure_Types.find(
                                (type) => type.value === field.value
                              )?.label
                            : "Select Structure Type"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandInput placeholder="Search structure type..." />
                        <CommandEmpty>No structure type found.</CommandEmpty>
                        <CommandGroup>
                          <CommandList>
                            {Structure_Types.map((type) => (
                              <CommandItem
                                value={type.label}
                                key={type.value}
                                onSelect={() => {
                                  form.setValue("Structure_Type", type.value);
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
              {/* Campo Texture Type con Popover */}
          <FormField
            control={form.control}
            name="Texture_Type"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Texture Type</FormLabel>
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
                          ? Texture_Types.find(
                              (type) => type.value === field.value
                            )?.label
                          : "Select Texture Type"}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <Command>
                      <CommandInput placeholder="Search texture type..." />
                      <CommandEmpty>No texture type found.</CommandEmpty>
                      <CommandGroup>
                        <CommandList>
                          {Texture_Types.map((type) => (
                            <CommandItem
                              value={type.label}
                              key={type.value}
                              onSelect={() => {
                                form.setValue("Texture_Type", type.value);
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

            {/* Campo Min Ass 1 con Popover */}
          <FormField
            control={form.control}
            name="Min_Ass_1"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Min Ass 1</FormLabel>
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
                          ? Min_Types.find(
                              (type) => type.value === field.value
                            )?.label
                          : "Select Mineral"}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <Command>
                      <CommandInput placeholder="Search mineral..." />
                      <CommandEmpty>No mineral found.</CommandEmpty>
                      <CommandGroup>
                        <CommandList>
                          {Min_Types.map((type) => (
                            <CommandItem
                              value={type.label}
                              key={type.value}
                              onSelect={() => {
                                form.setValue("Min_Ass_1", type.value);
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

          {/* Campo Min Ass 2 con Popover */}
          <FormField
            control={form.control}
            name="Min_Ass_2"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Min Ass 2</FormLabel>
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
                          ? Min_Types.find(
                              (type) => type.value === field.value
                            )?.label
                          : "Select Mineral"}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <Command>
                      <CommandInput placeholder="Search mineral..." />
                      <CommandEmpty>No mineral found.</CommandEmpty>
                      <CommandGroup>
                        <CommandList>
                          {Min_Types.map((type) => (
                            <CommandItem
                              value={type.label}
                              key={type.value}
                              onSelect={() => {
                                form.setValue("Min_Ass_2", type.value);
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


          {/* Campo Min Ass 3 con Popover */}
          <FormField
            control={form.control}
            name="Min_Ass_3"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Min Ass 3</FormLabel>
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
                          ? Min_Types.find(
                              (type) => type.value === field.value
                            )?.label
                          : "Select Mineral"}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <Command>
                      <CommandInput placeholder="Search mineral..." />
                      <CommandEmpty>No mineral found.</CommandEmpty>
                      <CommandGroup>
                        <CommandList>
                          {Min_Types.map((type) => (
                            <CommandItem
                              value={type.label}
                              key={type.value}
                              onSelect={() => {
                                form.setValue("Min_Ass_3", type.value);
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

            {/* Campo Thickness */}
            <FormField
              control={form.control}
              name="Thickness"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Thickness (cm)</FormLabel>
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
            name="Open"
            render={({ field }) => (
              <FormItem className="space-y-3">
              <FormLabel>Open</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Open" id="open" />
                    <Label htmlFor="open">Open</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Close" id="close" />
                    <Label htmlFor="close">Close</Label>
                  </div>
                  </RadioGroup>
              </FormControl>
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