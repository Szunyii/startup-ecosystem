"use client";
import React from "react";
import { formatHuf, formatPerc, startupDataPayload } from "@/lib/utils";
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
import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  InfoIcon,
  SearchIcon,
} from "lucide-react";

import { Button } from "./ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

export const columns: ColumnDef<startupDataPayload>[] = [
  {
    id: "No",
    header: () => <div className="text-right">No</div>,
    cell: (info) => {
      const rowIndex = info.table
        .getRowModel()
        .rows.findIndex((r) => r.id === info.row.id);
      return rowIndex + 1;

      // ({ row, table }) => {
      // const index = row.index + 1;
      // return <div className="text-right font-medium">{index}</div>;
      // const visibleRows = table.getFilteredRowModel().rows;
      // const rowIndex = visibleRows.findIndex((r) => r.id === row.id);
      // return rowIndex + 1;
    },
    // columns:
  },
  {
    accessorKey: "companyName",
    header: ({ column }) => {
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
    // cell: ({ row }) => {

    // },
  },
  {
    accessorKey: "tax_2024",
    header: ({ column }) => {
      return (
        <div className="flex flex-row-reverse">
          <div className="flex flex-row gap-1">
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
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <InfoIcon size={15} />
                </TooltipTrigger>
                <TooltipContent align="center" className="max-w-60">
                  <p>
                    Corporate income tax (TAO in Hungary) paid by the company
                    annually, as reported to the Hungarian tax authority.
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      );
    },
    cell: ({ row }) => {
      const tax = parseFloat(row.getValue("tax_2024"));

      return <div className="text-right font-medium">{formatHuf(tax)}</div>;
    },
  },
  {
    accessorKey: "tax_YoY",
    header: ({ column }) => {
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
      const val: number = row.getValue("tax_YoY")!;
      const tax = formatPerc(val)!;

      return (
        <div
          className={`text-right font-medium ${
            val > 0 ? "text-green-500" : "text-red-500"
          }`}
        >
          {tax}
        </div>
      );
    },
  },
  {
    accessorKey: "salary_2024",
    header: ({ column }) => {
      return (
        <div className="flex flex-row-reverse">
          <div className="flex flex-row gap-1">
            <Button
              className="flex pr-0 hover:bg-transparent gap-1"
              variant="ghost"
              onClick={() => column.toggleSorting()}
            >
              Payroll
              {column.getIsSorted() === false ? (
                <ArrowUpDown className=" h-4 w-4" />
              ) : column.getIsSorted() === "asc" ? (
                <ArrowDown className=" h-4 w-4" />
              ) : (
                <ArrowUp className=" h-4 w-4" />
              )}
            </Button>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <InfoIcon size={15} />
                </TooltipTrigger>
                <TooltipContent align="center" className="max-w-60">
                  <p>
                    Total personnel-related expenses for the company (e.g.,
                    salaries, benefits), reported in annual financial
                    statements.
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      );
    },
    cell: ({ row }) => {
      const tax = parseFloat(row.getValue("salary_2024"));

      return <div className="text-right font-medium">{formatHuf(tax)}</div>;
    },
  },
  {
    accessorKey: "salary_YoY",
    header: ({ column }) => {
      return (
        <div className="flex flex-row-reverse">
          <Button
            className="flex pr-0 hover:bg-transparent gap-1"
            variant="ghost"
            onClick={() => column.toggleSorting()}
          >
            Payroll YoY
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
      const val: number = row.getValue("salary_YoY")!;
      const tax = formatPerc(val)!;

      return (
        <div
          className={`text-right font-medium ${
            val > 0 ? "text-green-500" : "text-red-500"
          }`}
        >
          {tax}
        </div>
      );
    },
  },
  {
    accessorKey: "person_2024",
    header: ({ column }) => {
      return (
        <div className="flex flex-row-reverse">
          <div className="flex flex-row gap-1">
            <Button
              className="flex pr-0 hover:bg-transparent gap-1"
              variant="ghost"
              onClick={() => column.toggleSorting()}
            >
              Employees
              {column.getIsSorted() === false ? (
                <ArrowUpDown className=" h-4 w-4" />
              ) : column.getIsSorted() === "asc" ? (
                <ArrowDown className=" h-4 w-4" />
              ) : (
                <ArrowUp className=" h-4 w-4" />
              )}
            </Button>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <InfoIcon size={15} />
                </TooltipTrigger>
                <TooltipContent align="center" className="max-w-3xl">
                  <p className="">
                    Average number of employees as reported in the company’s
                    annual closing statement.
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      );
    },
    cell: ({ row }) => {
      const tax = parseFloat(row.getValue("person_2024"));

      return <div className="text-right font-medium">{tax}</div>;
    },
  },
  {
    accessorKey: "person_YoY",
    header: ({ column }) => {
      return (
        <div className="flex flex-row-reverse">
          <Button
            className="flex pr-0 hover:bg-transparent gap-1"
            variant="ghost"
            onClick={() => column.toggleSorting()}
          >
            Employees YoY
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
      const val: number = row.getValue("person_YoY")!;
      const tax = formatPerc(val)!;

      return (
        <div
          className={`text-right font-medium ${
            val > 0 ? "text-green-500" : "text-red-500"
          }`}
        >
          {tax}
        </div>
      );
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
  link,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );

  // const [filtering, setFiltering] = useState({});

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
    // onGlobalFilterChange: setFiltering,
  });

  // const handleDatePick = (value: string) => {
  //   setFiltering(parseInt(value));
  // };

  return (
    <div>
      <div className="flex items-center justify-centers gap-2 mb-4 text-5xl">
        <h1 className=" font-medium ">Startups</h1>
        <span className="text-muted-foreground">
          (199)<sup>*</sup>
        </span>
      </div>

      {/* filter row */}
      <div className=" gap-3 flex flex-row w-full mt-3 mb-2">
        <div className="relative min-w-[300px] flex items-center mb-3">
          <Input
            placeholder="Company's name"
            value={
              (table.getColumn("companyName")?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table.getColumn("companyName")?.setFilterValue(event.target.value)
            }
          />
          <SearchIcon className="absolute right-2 top-50%" />
        </div>
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
