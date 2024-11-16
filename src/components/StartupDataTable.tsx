"use client";
import React from "react";
import { StartupType } from "@/lib/utils";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  SortingState,
  getSortedRowModel,
  ColumnFiltersState,
  getFilteredRowModel,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "./ui/input";
import { ArrowDown, ArrowUp, ArrowUpDown, SearchIcon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Button } from "./ui/button";

export const columns: ColumnDef<StartupType>[] = [
  {
    accessorKey: "name",
    header: () => <div className="text-right">No</div>,
    cell: ({ row }) => {
      const index = row.index + 1;
      return <div className="text-right font-medium">{index}</div>;
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      console.log(column.getIsSorted());
      return (
        <Button
          className="flex pl-0 hover:bg-transparent gap-1"
          variant="ghost"
          onClick={() => column.toggleSorting()}
        >
          Company
          {column.getIsSorted() === false ? (
            <ArrowUpDown className=" h-4 w-4" />
          ) : column.getIsSorted() === "asc" ? (
            <ArrowDown className="ml-2 h-4 w-4" />
          ) : (
            <ArrowUp className="ml-2 h-4 w-4" />
          )}
        </Button>
      );
    },
  },
  {
    accessorKey: "taxes",
    // header: "Taxes paid",
    header: ({ column }) => {
      console.log(column.getIsSorted());
      return (
        <div className="flex flex-row-reverse">
          <Button
            className="flex pr-0 hover:bg-transparent gap-1"
            variant="ghost"
            onClick={() => column.toggleSorting()}
          >
            Taxes paid
            {column.getIsSorted() === false ? (
              <ArrowUpDown className=" h-4 w-4" />
            ) : column.getIsSorted() === "asc" ? (
              <ArrowDown className=" h-4 w-4" />
            ) : (
              <ArrowUp className=" h-4 w-4" />
            )}
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const taxes = parseFloat(row.getValue("taxes"));
      const formatted = new Intl.NumberFormat("hu-HU", {
        style: "currency",
        currency: "HUF",
        maximumFractionDigits: 0,
      }).format(taxes);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "taxesYoY",
    header: ({ column }) => {
      console.log(column.getIsSorted());
      return (
        <div className="flex flex-row-reverse">
          <Button
            className="flex pr-0 hover:bg-transparent gap-1"
            variant="ghost"
            onClick={() => column.toggleSorting()}
          >
            Taxes YoY
            {column.getIsSorted() === false ? (
              <ArrowUpDown className=" h-4 w-4" />
            ) : column.getIsSorted() === "asc" ? (
              <ArrowDown className=" h-4 w-4" />
            ) : (
              <ArrowUp className=" h-4 w-4" />
            )}
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const taxesYoY = parseFloat(row.getValue("taxesYoY"));
      const formatted = new Intl.NumberFormat("hu-HU", {
        style: "percent",
        maximumFractionDigits: 2,
      }).format(taxesYoY / 100);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "salary",
    header: ({ column }) => {
      console.log(column.getIsSorted());
      return (
        <div className="flex flex-row-reverse">
          <Button
            className="flex pr-0 hover:bg-transparent gap-1"
            variant="ghost"
            onClick={() => column.toggleSorting()}
          >
            Salary
            {column.getIsSorted() === false ? (
              <ArrowUpDown className=" h-4 w-4" />
            ) : column.getIsSorted() === "asc" ? (
              <ArrowDown className=" h-4 w-4" />
            ) : (
              <ArrowUp className=" h-4 w-4" />
            )}
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const salary = parseFloat(row.getValue("salary"));
      const formatted = new Intl.NumberFormat("hu-HU", {
        style: "currency",
        currency: "HUF",
        maximumFractionDigits: 0,
      }).format(salary);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "salaryYoY",
    header: ({ column }) => {
      console.log(column.getIsSorted());
      return (
        <div className="flex flex-row-reverse">
          <Button
            className="flex pr-0 hover:bg-transparent gap-1"
            variant="ghost"
            onClick={() => column.toggleSorting()}
          >
            Salary YoY
            {column.getIsSorted() === false ? (
              <ArrowUpDown className=" h-4 w-4" />
            ) : column.getIsSorted() === "asc" ? (
              <ArrowDown className=" h-4 w-4" />
            ) : (
              <ArrowUp className=" h-4 w-4" />
            )}
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const salaryYoY = parseFloat(row.getValue("salaryYoY"));
      const formatted = new Intl.NumberFormat("hu-HU", {
        style: "percent",
        maximumFractionDigits: 2,
      }).format(salaryYoY / 100);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "employee",
    header: ({ column }) => {
      console.log(column.getIsSorted());
      return (
        <div className="flex flex-row-reverse">
          <Button
            className="flex pr-0 hover:bg-transparent gap-1"
            variant="ghost"
            onClick={() => column.toggleSorting()}
          >
            Employee
            {column.getIsSorted() === false ? (
              <ArrowUpDown className=" h-4 w-4" />
            ) : column.getIsSorted() === "asc" ? (
              <ArrowDown className=" h-4 w-4" />
            ) : (
              <ArrowUp className=" h-4 w-4" />
            )}
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const employee = parseFloat(row.getValue("employee"));
      const formatted = new Intl.NumberFormat("hu-HU", {}).format(employee);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "employeeYoY",
    header: ({ column }) => {
      console.log(column.getIsSorted());
      return (
        <div className="flex flex-row-reverse">
          <Button
            className="flex pr-0 hover:bg-transparent gap-1"
            variant="ghost"
            onClick={() => column.toggleSorting()}
          >
            Employee YoY
            {column.getIsSorted() === false ? (
              <ArrowUpDown className=" h-4 w-4" />
            ) : column.getIsSorted() === "asc" ? (
              <ArrowDown className=" h-4 w-4" />
            ) : (
              <ArrowUp className=" h-4 w-4" />
            )}
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const employeeYoY = parseFloat(row.getValue("employeeYoY"));
      const formatted = new Intl.NumberFormat("hu-HU", {
        style: "percent",
        maximumFractionDigits: 2,
      }).format(employeeYoY / 100);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
];

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function StartupDataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  return (
    <div>
      <div className="flex items-center justify-centers gap-2 mb-4 text-5xl">
        <h1 className=" font-medium ">Startups</h1>
        <span className="text-muted-foreground">(361)</span>
      </div>

      {/* filter row */}
      <div className=" gap-3 flex flex-row w-full mt-3 mb-2">
        <div className="relative min-w-[300px] flex items-center mb-3">
          <Input
            placeholder="Company's name"
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("name")?.setFilterValue(event.target.value)
            }
          />
          <SearchIcon className="absolute right-2 top-50%" />
        </div>
        <Select defaultValue="2024">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Year" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={"2024"}>2024</SelectItem>
            <SelectItem value="2023">2023</SelectItem>
            <SelectItem value="2022">2022</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {/* table */}
      <div className="rounded-md border">
        <Table className="w-full">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default StartupDataTable;
